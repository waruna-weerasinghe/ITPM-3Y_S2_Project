const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();


const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    //useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology: true,
   // useFindModify: false
});

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB Connection Success!");
})


const LoyaltyRouter = require("./routes/Loyalty/Loyalty.js");
const userRouter = require('./routes/User/Employees.js');
//const OrderRouter = require('./routes/Order_Management/OrdersRoute.js');

app.use(express.static('uploads/images'));






app.use("/LoyaltyProgramme",LoyaltyRouter);
app.use('/user', userRouter);
//app.use("/Employee",);
//app.use('/order', OrderRouter);

app.listen(PORT, () =>{
    console.log(`server is up and running on port ${PORT}`)
})

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to our De-Rush Clothing Store API...");
});

app.get("/prodect", (req, res) => {
    res.send([2,3,4])
});

const port = process.env.PORT || 3000;

app.listen(port,console.log('Server running on port ${port}'));

