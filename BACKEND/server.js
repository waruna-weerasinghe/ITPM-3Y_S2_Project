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

//const LoyaltyRouter = require("./routes/Loyalty.js");
const LoyaltyRouter = require("./routes/Loyalty/Loyalty.js");
const MemberRouter = require('./routes/User/Members.js');
//const orderRouter  = require("./routes/Order_Manegement/OrderRoute.js");

app.use(express.static('uploads/images'));





app.use("/LoyaltyProgramme",LoyaltyRouter);
app.use('/User', MemberRouter);
//app.use('/order' , orderRouter)

app.listen(PORT, () =>{
    console.log(`server is up and running on port ${PORT}`)
})

