const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Set up Express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace with your own MongoDB URI)
mongoose.connect('mongodb://localhost:27017/clothesstore', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the Clothes model
const Clothe = mongoose.model('Clothe', new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    image: String,
}));

// Routes
app.get('/api/clothes', async (req, res) => {
    try {
        const clothes = await Clothe.find();
        res.json(clothes);
    } catch (error) {
        res.status(500).send('Error fetching clothes');
    }
});

app.post('/api/clothes', async (req, res) => {
    const { name, category, price, image } = req.body;
    const newClothe = new Clothe({ name, category, price, image });
    try {
        await newClothe.save();
        res.status(201).json(newClothe);
    } catch (error) {
        res.status(500).send('Error adding clothe');
    }
});

app.put('/api/clothes/:id', async (req, res) => {
    const { id } = req.params;
    const { name, category, price, image } = req.body;
    try {
        const updatedClothe = await Clothe.findByIdAndUpdate(id, { name, category, price, image }, { new: true });
        res.json(updatedClothe);
    } catch (error) {
        res.status(500).send('Error updating clothe');
    }
});

app.delete('/api/clothes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Clothe.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send('Error deleting clothe');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
