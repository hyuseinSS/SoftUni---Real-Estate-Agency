const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const { secret, saltRounds } = require('../config/appConstants')


exports.register = async ({ name, username, password, repeatPassword }) => {
    if (password !== repeatPassword) {
        return;
    };

    let hashedPassword = await bcrypt.hash(password, saltRounds);

    let createdUser = await User.create({
        name,
        username,
        password: hashedPassword,
    })
    return createdUser;
}

exports.login = async ({ username, password }) => {

    const user = await User.findOne({ username: username });

    if (!user) {
        return;
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return isValid;
    }
    let result = await new Promise((resolve, reject) => {
        jwt.sign({ _id: user._id, username: user.username }, secret, { expiresIn: '2d' }, (err, token) => {
            if (err) {
                return reject(err);
            }

            resolve(token);
        });
    });

    return result;
};

exports.getUser = async (id) => {
    return await User.findById(id).lean()
}



