const router = require('express').Router();
const Payment = require('../models/payment.js');
const User = require('../models/user.js');
const MembershipPlan = require('../models/membershipPlan.js');
const mongoose = require('mongoose');
 // creat paymnent
router.post('/create', async(req, res) => {
    // ceack if userid and paln id is valid for mongoose   
    if (!mongoose.Types.ObjectId.isValid(req.body.userId) || !mongoose.Types.ObjectId.isValid(req.body.planId)) {
        return res.status(401).json("Invalid id");
    }
    
    
    // find plan by id
    const plan = await  MembershipPlan.findById(req.body.planId);
    // plan dosnt exist
    if (!plan) {
        return res.status(401).json("Plan not found");
    }


    const newPayment = new Payment({
        planId: req.body.planId,
        userId: req.body.userId,
        date: Date.now(),
        amount: plan.price,
    });
    if (req.body.planId === "" || req.body.userId === "" || req.body.date === "" || req.body.amount === "") {
        return res.status(400).json("Please fill out all fields");
    }
     // change expiration date of user in user model
     const user = await User.findById(req.body.userId);
     // user dosnt exist
     if (!user) {
         return res.status(401).json("User not found");
     }
    //  expiration date is corrent time + plan expiration
    const s =Date.now()
    if (user.membershipExpiration.getTime() > s) {
        return res.status(401).json("You already have a membership");
    }
    const expirationDate = Date.now() + (plan.expiration*24*60*60*1000);
    user.membershipExpiration = new Date(expirationDate);
    // if user memershipExpiration is not less than current time you cant creat payment
    

    
    try {
       
        await user.save();
        // save payment
        const savedPayment = await newPayment.save();
        res.status(200).json(savedPayment);
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
}
);
 


module.exports = router;