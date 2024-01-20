const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^[A-Z][a-z]+\s[A-Z][a-z]+$/.test(value);
            },
            message: 'Name should be in the format "Firstname Lastname"',
        },
    },
    username: {
        type:String,
        minLength:5,
        required:true,
    },
    password: {
        type:String,
        minLength:4,
    },
})

const User = mongoose.model('User', userSchema)

module.exports = User;