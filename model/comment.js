const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content : {
        type : String,
    },
    blog : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'blog',
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    }
})

const Comment =  new mongoose.model('comment',commentSchema)

module.exports = { Comment }