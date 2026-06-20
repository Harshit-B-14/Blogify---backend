const express = require('express')

const router = express.Router()

router.get('/', handle)

router.get('/:id', handle)

router.route('/createAccount')
    .get(handle)
    .post(handle)

router.route('/signin').get(handle)

module.exports = router;