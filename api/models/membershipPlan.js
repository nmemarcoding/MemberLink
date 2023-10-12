const mongoos = require('mongoose');

const membershipPlanSchema = mongoos.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    expiration: { type: Number, required: true },
});

module.exports = mongoos.model('MembershipPlan', membershipPlanSchema);