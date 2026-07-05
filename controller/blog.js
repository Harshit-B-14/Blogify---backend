const { User } = require('../model/user')
const { Blog } = require('../model/blog')
const multer = require('multer')

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
    const blogs = await Blog.find({createdBy : req.user.id})

    res.render('home', {
        blogs
    })
}

module.exports = { handleAddBlog }