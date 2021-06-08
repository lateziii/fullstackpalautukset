const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
    },
    url: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    comments: [
      {
        type: String,
      }
    ]
  })
  
  const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog