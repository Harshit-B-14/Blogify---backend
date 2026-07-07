const express = require('express')
const { Blog } = require('../model/blog')
const { handleAddBlog, handleGetBlogById } = require('../controller/blog')
const { upload } = require('../middleware/fileUpload')

const router = express.Router()

// router.route('/blog')
//     .get((req, res) => {
//         res.render('blog',
//             {
//                 user : req.user
//             }
//         )
//     })
    // .post((req, res) => {
    //     const { title, image, body } = req.body
    // })

router.route('/addBlog')
    .get((req, res) => {
        res.render('addBlog')
    })
    .post(upload.single('coverImage'), handleAddBlog)

router.route('/:id')
    .get(handleGetBlogById)

module.exports = router