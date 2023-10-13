const router = require('express').Router();
const CheckIn = require('../models/checkIn');
const User = require('../models/user');


// rout to check the member in

router.post('/', async (req, res) => {
    // find user with phone number or membeship number

    const user = await User.findOne({ $or: [{ phoneNumber: req.body.phoneNumber }, { membershipNumber: req.body.membershipNumber }] });
    if (!user) return res.status(400).send('User not found');
    // check if user membership is active
    if (user.membershipExpiration < Date.now()) return res.status(400).send('Membership expired');
    
    // create checkin try and catch
    try {
        const checkIn = new CheckIn({
            user: user._id,
        });
        await checkIn.save();
        res.send(checkIn);
     
    } catch (error) {
        res.status(400).send(error);
  
    }

}
);
  





module.exports = router;