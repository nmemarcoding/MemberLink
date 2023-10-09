const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    lastName: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 1,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    },
    phoneNumber: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    membershipExpiration: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });  

module.exports = mongoose.model('User', userSchema);
