const express = require('express')
const { User } = require('../model/user')
const { handleGetHomepage, handleGetSignin, handleGetSignup, handleSignUp, handleSignIn } = require('../controller/user')
const { Blog } = require('../model/blog')

const router = express.Router()

router.get('/', handleGetHomepage)

// router.get('/:id', handle)

router.route('/signup')
    .get(handleGetSignup)
    .post(handleSignUp)

router.route('/signin')
    .get(handleGetSignin)
    .post(handleSignIn)

router.route('/logout') 
    .get((req, res) => {
        req.clearCookie('token').redirect('/')
    })

router.route('/deleteAccounts')
    .get(async (req, res) => {
        await User.deleteMany({})
        await Blog.deleteMany({})
        res.clearCookie('token')
        res.render('reset')
    })

router.route('/data')
    .get(async (req, res) => {
        const users = await User.find({})
        res.render('data',{
            users
        })
    })

module.exports = router;