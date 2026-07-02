const { Blog } = require('../model/blog')
const { User } = require('../model/user')
const { validateToken } = require('../services/authentication')

async function handleGetHomepage(req, res){
    res.render('home',{
        user : null
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
    await User.create({name, email, role, password})
    res.render('home')
}

async function handleSignIn(req, res){
    const { email, password } = req.body
    try{

        // generated token using email, password
        const token = await User.matchPasswordAndGenerateToken( email, password )
        
        // got user payload from token containing all imp info
        const user = validateToken(token)
        console.log(user)

        // got the id from payload
        const blogs = await Blog.find({createrBy : user.id})
        
        //set the token as cookie named 'token'
        return res.cookie('token',token).render('home',{
            user : user,
            blogs : blogs
        })
    }
    catch(err){

        // catch wrong info
        res.render('signin',{
            error : "wrong email or password"
        })
    }                
}

module.exports = { handleGetHomepage, handleGetSignin, handleGetSignup, handleSignUp, handleSignIn }