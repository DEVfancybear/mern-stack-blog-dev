const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const {check, validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");

//@route GET api/auth
//@desc Test route
//@access Public
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        await res.json(user)
    } catch (e) {
        console.log(e.message);
        res.status(500).send("Server Error")
    }
    // res.send("Router auth");
});


//@route POST api/auth
//@desc Authenticate user & get token
//@access Public
router.post("/",
    // check validate các schema của models User
    [
        // username must be an email
        check('email', 'Please include a valid email').isEmail(),
        // password must be at least 6 chars long
        check('password', 'Password is required').exists()
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {email, password} = req.body;
        try {
            // See if user exits
            let user = await User.findOne({
                email
            })
            if (!user) {
                return res.status(400).json({
                    errors: [{msg: "Invalid Credentials"}]
                })
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    errors: [{msg: "Invalid Credentials"}]
                })
            }
            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(
                payload,
                config.get("jwtSecret"),
                {expiresIn: 360000},
                (err, token) => {
                    if (err) throw err;
                    res.json({token});
                }
            );
            // console.log(req.body);
            // res.send("User router");
        } catch (e) {
            console.log(e.message);
            res.status(500).send('Server error');
        }

    })
module.exports = router;