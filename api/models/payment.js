const mongoos = require('mongoose');

const paymentSchema = mongoos.Schema({
    planId:{
        type: mongoos.Schema.Types.ObjectId,
        ref: 'MembershipPlan',
        required: true
    },
    userId:{
        type: mongoos.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
});

module.exports = mongoos.model('Payment', paymentSchema);
