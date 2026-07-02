const mongoose = require('mongoose')
const { createHmac, randomBytes } = require('crypto')
const { generateToken, validateToken } = require('../services/authentication')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    role : {
        type : String,
        required : true,
    },
    salt : {
        type : String
    },
    password : {
        type : String,
        required : true
    }
})

userSchema.pre('save', function (){
    const user = this
    if(!user.isModified('password')) return

    const salt = randomBytes(16).toString()
    const hashedPassword = createHmac('sha256',salt)
        .update(user.password)
        .digest('hex')
    
    this.salt = salt
    this.password = hashedPassword
})

userSchema.statics.matchPasswordAndGenerateToken = async function(email, password){
    const user =  await this.findOne({ email })
    if(!user) throw new Error("User not found")
    
    const salt = user.salt
    const hashedPassword = user.password

    const userProvidedHash = createHmac('sha256',salt)
        .update(password)
        .digest('hex')
    
    if(hashedPassword !== userProvidedHash){
        throw new Error("Incorrect Password")
    }

    const token = generateToken(user)
    
    return token
}

const User = new mongoose.model('user', userSchema)

module.exports = { User }