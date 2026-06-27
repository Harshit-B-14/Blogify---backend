const express = require('express')
const { User } = require('../model/user')

const router = express.Router()

router.get('/', handle)

router.get('/:id', handle)

router.route('/createAccount')
    .get(handle)
    .post(handle)

router.route('/signin')
    .get(handle)
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

module.exports = router;