const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
//@route GET api/users
//@desc Test route
//@access Public
router.get("/", (req, res) => res.send("Router users"));
//@route POST api/users
//@desc Test route
//@access Public
router.post("/",
    // check các schema của models User
    [
    check('name', 'Name is required').not().isEmpty(),
    // username must be an email
    check('email', 'Please include a valid email').isEmail(),
    // password must be at least 6 chars long
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], (req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        // hiển thị lỗi khi post data lên api
        return res.status(400).json({
            errors: errors.array()
        })
    }
    console.log(req.body);
    res.send("User router");
})
module.exports = router;