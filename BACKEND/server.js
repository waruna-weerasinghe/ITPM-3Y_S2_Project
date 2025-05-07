const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGODB_URL;

// Middleware
app.use(cors());
app.use(express.json()); // Replaces bodyParser.json()
app.use(express.static('uploads/images'));

// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("✅ MongoDB Connection Success!");
});

// Routes
const LoyaltyRouter = require("./routes/Loyalty/Loyalty.js");
const userRouter = require('./routes/User/Employees.js');
// const OrderRouter = require('./routes/Order_Management/OrdersRoute.js');

app.use("/LoyaltyProgramme", LoyaltyRouter);
app.use("/user", userRouter);
// app.use("/order", OrderRouter);

// Test routes
app.get("/", (req, res) => {
  res.send("Welcome to our De-Rush Clothing Store API...");
});

app.get("/product", (req, res) => {
  res.send([2, 3, 4]);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
