const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LoyaltySchema = new Schema({

    name : {
        type : String,
        required : true
    },
    age : {
        type : String,
        required : true
    },
    gender :{
        type : String,
        required : true
    }


})

const Loyalty = mongoose.model("Loyalty",LoyaltySchema);

module.exports = Loyalty;