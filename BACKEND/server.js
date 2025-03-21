const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();


const PORT = process.env.PORT || 8070;

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

<<<<<<< HEAD
const LoyaltyRouter = require("./routes/Loyalty.js");
const MemberRouter = require('./routes/User/Members.js');

app.use(express.static('uploads/images'));

=======
const LoyaltyRouter = require("./routes/Loyalty/Loyalty.js");
>>>>>>> 475a9c9997ac5a56c312f69eb1dbfed6419ac316

app.use("/Loyalty_programme",LoyaltyRouter);
app.use('/User', MemberRouter);

app.listen(PORT, () =>{
    console.log(`server is up and running on port ${PORT}`)
})

