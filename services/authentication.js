const jwt = require('jsonwebtoken')
const secret = 'hpvrtx#7'

function generateToken(user){
    const payload = {
        id = user._id,
        email = user.email,
        password = user.password,
        role = user.role
    }

    const token = jwt.sign(payload, secret)

    return token
}

function validateToken(token){
    const payload = jwt.verify(token,secret)

    return payload
}

module.exports = { generateToken, validateToken }