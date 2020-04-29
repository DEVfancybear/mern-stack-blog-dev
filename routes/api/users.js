const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator');
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");


//@route GET api/users
//@desc Test route
//@access Public
router.get("/", (req, res) => res.send("Router users"));


//@route POST api/users
//@desc Test route
//@access Public
router.post("/",
    // check validate các schema của models User
    [
        check('name', 'Name is required').not().isEmpty(),
        // username must be an email
        check('email', 'Please include a valid email').isEmail(),
        // password must be at least 6 chars long
        check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {name, email, password} = req.body;
        try {
            // See if user exits
            let user = await User.findOne({
                email
            })
            if (user) {
                return res.status(400).json({
                    errors: [{msg: "User already exists"}]
                })
            }
            // Get users avatar
            const avatar = gravatar.url(email, {
                // setting kích thước avatar, ngày up avatar ...
                s: "200",
                r: "pg",
                d: "mm"
            })
            user = new User({
                name, email, password, avatar
            })
            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            // Return Jsonwebtoken
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

