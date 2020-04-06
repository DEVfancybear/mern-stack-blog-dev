const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 30
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 6
    },
    lastname: {
        type: String,
        maxlength: 30
    },
    role: {
        type: Number,
        default: 0
    },
    token : {
        type: String
    },
    tokenExp: {
        type: Number
    }
})
const User = mongoose.model('User', userSchema);
module.exports = {User};