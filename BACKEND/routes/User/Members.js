const mongoose = require('mongoose');
const rolesEnum = ['user', 'admin', 'staff'];

const memberSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    reenterpassword: String,
    number: String,
    role: {
        type: String,
        enum: rolesEnum,
        default: 'user' // Default role is 'user'
    },
    otp: String,
     // Add a field to store OTP
     image: String,
});

const MemberModel = mongoose.model("member", memberSchema);

module.exports = MemberModel;
