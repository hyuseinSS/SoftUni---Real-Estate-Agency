const authService = require('../services/authService')
const router = require('express').Router()
const { sessionName } = require('../config/appConstants')


router.get('/register', (req, res) => {
    if (req.user) {
        return res.redirect('/')
    }
    res.render('auth/register')
})

router.post('/register', async (req, res) => {

    const userCred = req.body
    if (userCred.username == '' || userCred.name == '' || userCred.password == '') {
        res.render('auth/register', { error: "All fields are required!" })
    }
    if (userCred.repeatPassword !== userCred.password) {
        res.render('auth/register', { error: "Password Mismatch!" })
    }

    const user = await authService.register(req.body)


    if (user) {
        const token = await authService.login(req.body)
        res.cookie(sessionName, token, { httpOnly: true })
        res.redirect('/')
    } else {
        res.render('404')
    }
})

router.get('/login', (req, res) => {
    if (req.user) {
        return res.redirect('/')
    }
    res.render('auth/login')
})


router.post('/login', async (req, res) => {
    const token = await authService.login(req.body)

    if (!token) {
        return res.render('auth/login', { error: "Username or Password is invalid!" });
    }
    res.cookie(sessionName, token, { httpOnly: true })
    res.redirect('/');
})

router.get('/logout', (req, res) => {

    if (!req.user) {
        return res.redirect('/')
    }

    res.clearCookie(sessionName);
    res.redirect('/')
})

module.exports = router;