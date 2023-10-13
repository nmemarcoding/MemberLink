const router = require('express').Router();
const CheckIn = require('../models/checkIn');
const User = require('../models/user');

// Route to check a member in
router.post('/', async (req, res) => {
    // Validate incoming data
    if (!req.body.phoneNumber && !req.body.membershipNumber) {
        return res.status(400).send('Phone number or membership number is required.');
    }

    try {
        // Find user with phone number or membership number
        const user = await User.findOne({
            $or: [{ phoneNumber: req.body.phoneNumber }, { membershipNumber: req.body.membershipNumber }]
        }).populate('firstName lastName');

        if (!user) {
            return res.status(400).send('User not found');
        }

        // Check if user membership is active
        if (user.membershipExpiration < Date.now()) {
            return res.status(400).send('Membership expired');
        }

        // Populate firstName and lastName
        

        // Create a check-in record
        const checkIn = new CheckIn({
            user: user._id,
        });
        await checkIn.save();

        // Send only firstName and lastName in the response
        res.send({
            firstName: user.firstName,
            lastName: user.lastName,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
