const { User } = require('../model/user')
const { Blog } = require('../model/blog')
const multer = require('multer')

async function handleGetBlogById(req, res){
    const id = req.params.id
    const blog = await Blog.findById(id).populate('createdBy')

    res.render('blog',{
        blog
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

module.exports = { handleAddBlog, handleGetBlogById }