const express = require('express')
const { Blog } = require('../model/blog')

const router = express.Router()

router.route('/blog')
    .get((req, res) => {
        res.render('blog',
            {
                user : req.user
            }
        )
    })
    .post((req, res) => {
        const { title, image, body } = res
    })

module.exports = router