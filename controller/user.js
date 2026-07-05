const { Blog } = require('../model/blog')
const { User } = require('../model/user')
const { validateToken, generateToken } = require('../services/authentication')
const path = require('path')
const fs = require('fs')

async function handleGetHomepage(req, res){
    
    const user = req.user

    if(!user) return res.render('home')

    // got the id 
    const blogs = await Blog.find({createdBy : user.id})
    
    res.render('home',{
        blogs
    })
}

async function handleGetSignin(req, res){
    res.render('signin', {
        error : null
    })
}

async function handleGetSignup(req, res){
    res.render('signup')
}

async function handleSignUp(req, res){
    const {name, password, email} = req.body
    const role = 'user'
    const user = await User.create({name, email, role, password})

    //generate token and set cookie
    const token = generateToken(user)
    
    // making a folder using this new user's id
    await fs.mkdirSync(path.join(__dirname, '..', 'uploads', user._id.toString()), {
        recursive : true
    })

    res.cookie('token',token).redirect('/')
}

async function handleSignIn(req, res){
    const { email, password } = req.body
    try{
        console.log('before match bro is this it')
        // generated token using email, password
        const token = await User.matchPasswordAndGenerateToken( email, password )

        // got user payload from token containing all imp info
        const user = validateToken(token)
        console.log(user)
        
        //set the token as cookie named 'token'
        return res.cookie('token',token).redirect('/')
    }
    catch(err){

        // catch wrong info
        res.render('signin',{
            error : "wrong email or password"
        })
    }                
}

module.exports = { handleGetHomepage, handleGetSignin, handleGetSignup, handleSignUp, handleSignIn }