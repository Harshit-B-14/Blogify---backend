const { User } = require('../model/user')
const { Blog } = require('../model/blog')
const { Comment } = require('../model/comment')
const multer = require('multer')

async function handleGetBlogById(req, res){
    const id = req.params.id
    const blog = await Blog.findById(id).populate('createdBy')
    const comments = await Comment.find({ blog : id }).populate('user')
    
    res.render('blog',{
        blog,
        comments
    })
    // res.render('/blog',)
}

async function handleAddBlog(req, res){
    try{
        const { title, body } = req.body
        await Blog.create({
            title,
            body,
            coverImage : `/uploads/${req.user.id}/${req.file.filename}`,
            createdBy : req.user.id
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).send('something went wrong')
    }

    // descending order
    const blogs = await Blog.find({}).sort({createdAt : -1})

    res.render('home', {
        blogs
    })
}

async function handleComment(req, res){
    const content = req.body.comment
    const user = req.user.id
    const blog = req.params.id
 
    await Comment.create({
        content,
        user,
        blog
    })
    
    res.redirect(`/blog/${blog}`)
    
}

module.exports = { handleAddBlog, handleGetBlogById, handleComment }