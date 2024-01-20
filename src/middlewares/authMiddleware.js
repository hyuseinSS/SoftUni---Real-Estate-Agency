const jwt = require('jsonwebtoken')
const { sessionName, secret } = require('../config/appConstants')
const { promisify } = require('util')

const jwtVerify = promisify(jwt.verify)


exports.auth = async (req, res, next) => {
    let token = req.cookies[sessionName]

    if (token) {
        try {
            let decodedToken = await jwtVerify(token, secret)
            req.user = decodedToken;
            res.locals.user = decodedToken;
        } catch (err) {
            console.log(err);
            return res.redirect('/404');
        }
    }
    next()
};


exports.isOut = (req, res, next) => {
    if (!req.user) {
        res.redirect('/404')
    }
    next()
}
