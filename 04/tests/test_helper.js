const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

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

  const initialUsers = [
    {
        name: 'Meikä Mandoliini',
        username: 'meitsi',
        password: "salaisuus"
    },
    {
        name: 'Meikä Makkara',
        username: 'pouttu',
        password: "salaisuus"
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

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb, initialUsers
}