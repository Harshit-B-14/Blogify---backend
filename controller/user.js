const { Blog } = require('../model/blog')
const { User } = require('../model/user')

async function handleGetHomepage(req, res){
    res.render('home',{})
}

async function handleSignUp(req, res){
    const {name, password, email} = req.body
    await User.create({name, password, email})
    res.render('home')
}

async function handleSignin(req, res){
    const {email, password} = req.body
    
    const user = await User.find({email, password})
    
    if(!user){
        res.render('signin',{
            error : "Invalid username or password"
        })
    }

    const blogs = await Blog.find({createrBy : user._id})
    return res.redirect('/',{
        blogs
    })
}