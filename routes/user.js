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
    .post( async (req, res) => {
        const { email, password } = req.body
        try{
            const user = await User.matchPassword( email, password )
            console.log('User : ', user)
        }
        catch(err){
            res.json({message : "incorrect email or password"})
        }            
        return res.redirect('/')
    })

router.route('/logout') 
    .get((req, res) => {
        req.clearCookie('token').redirect('/')
    })

router.route('/deleteAccounts')
    .get(async (req, res) => {
        await User.deleteMany({})
        await Blog.deleteMany({})
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