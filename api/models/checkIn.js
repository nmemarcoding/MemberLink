const mongoose = require('mongoose');

const checkInSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    checkInTime: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model('CheckIn', checkInSchema);
