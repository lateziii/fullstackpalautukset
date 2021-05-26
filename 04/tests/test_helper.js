const Blog = require('../models/blog')

const initialBlogs = [
    {
      "title": "eka",
      "author": "minä",
      "url": "eka",
      "likes": 42   
    },
    {
      "title": "toka",
      "author": "sinä",
      "url": "toka",
      "likes": 23   
    }
  ]

const nonExistingId = async () => {
    const blog = new Blog({title: "nothing", author: "nobody", url: "nowhere", likes: 0})
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}