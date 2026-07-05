const express = require('express')
const { Blog } = require('../model/blog')
const { handleAddBlog } = require('../controller/blog')
const { upload } = require('../middleware/fileUpload')

const router = express.Router()

router.route('/blog')
    .get((req, res) => {
        res.render('blog',
            {
                user : req.user
            }
        )
    })
    // .post((req, res) => {
    //     const { title, image, body } = req.body
    // })

router.route('/addBlog')
    .get((req, res) => {
        res.render('blog')
    })
    .post(upload.single('coverImage'), handleAddBlog)

module.exports = router