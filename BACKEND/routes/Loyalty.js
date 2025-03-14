const router = require('express').Router();
let Loyalty = require('../models/Loyalty_Programme'); // Ensure correct import

// Add a new loyalty member
router.route("/add").post(async (req, res) => {
    try {
        const { name, age, gender } = req.body;

        const newLoyalty = new Loyalty({
            name,
            age,
            gender
        });

        await newLoyalty.save();
        res.status(201).json({ message: "Loyalty member added successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
