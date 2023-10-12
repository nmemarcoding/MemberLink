const router = require("express").Router();
const MembershipPlan = require("../models/membershipPlan.js");
const User = require("../models/user.js");

// creat membership plan

router.post("/create", async(req, res) => {
    const newMembershipPlan = new MembershipPlan({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        expiration: req.body.expiration,
    });
    if (req.body.name === "" || req.body.description === "" || req.body.price === "" || req.body.expiration === "") {
        return res.status(400).json("Please fill out all fields");
    }

    try {
        const savedMembershipPlan = await newMembershipPlan.save();
        res.status(200).json(savedMembershipPlan);
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
}
);

//  get all membership plans
router.get("/", async(req, res) => {
    try {
        const membershipPlans = await MembershipPlan.find();
        res.status(200).json(membershipPlans);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get user membership by user id
router.get("/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user.membershipExpiration);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;