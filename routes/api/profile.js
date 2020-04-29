const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");


//@route GET api/profile/me
//@desc Get current users profile
//@access Private
router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id // req.user.id là schema user của models Profile
        })
            .populate('user', ['name', 'avatar']);
        if(!profile) {
            return res.status(400).json({msg: "There is no profile for this user"})
        };
        res.json(profile);
    } catch (e) {
        console.log(e.message);
        res.status(500).send("Server Error");
    }
    // res.send("Router profile")
});
module.exports = router;