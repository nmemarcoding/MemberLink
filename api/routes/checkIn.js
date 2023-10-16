const router = require('express').Router();
const { mongo } = require("mongoose");
const CheckIn = require('../models/checkIn');
const User = require('../models/user');
const mongoose = require('mongoose');

// Route to check a member in
router.post('/', async (req, res) => {
    // Validate incoming data
    if (!req.body.phoneNumber && !req.body.membershipNumber) {
        return res.status(400).send('Phone number or membership number is required.');
    }

    try {
        // check that membership number is numeric if provided
        if (req.body.membershipNumber && !/^\d+$/.test(req.body.membershipNumber)) {
            return res.status(400).send('Membership number must be numeric.');
        }
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

// gett all the user checkins by user id
router.get('/:id', async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).send('Invalid id');
    }
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(400).send('User not found');
    }
    try {
        const checkIns = await CheckIn.find({ user: req.params.id })
        
        res.status(200).json(checkIns);
    } catch (err) {
        res.status(500).json(err);
    }
});

// gett all the checkins
router.get('/', async (req, res) => {
    
    try {
        const checkIns = await CheckIn.find();
        res.status(200).json(checkIns);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;
