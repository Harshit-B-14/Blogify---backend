const express = require('express')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
    },
    coverImage : {
        type : String,
        required : false
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,  
        ref : 'User' // ref makes the 
    }
}, {timestamps : true})

const Blog = new mongoose.model('blog', blogSchema)

module.exports = { Blog }