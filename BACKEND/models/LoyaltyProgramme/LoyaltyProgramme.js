const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LoyaltySchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    telephone :{
        type : Number,
        required : true
    },
    address :{
        type : String,
        required : true
    },
    category :{
        type : String,
        required : true
    },
    image: {
        type: Object, 
        required: true,
    }


})

const Loyalty = mongoose.model("Loyalty",LoyaltySchema);

module.exports = Loyalty;