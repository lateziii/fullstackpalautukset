const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.post('/', async (request, response, next) => {
  const body = await request.body
  console.log(request.body)
  const saltRounds = 8
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
  try {
    const savedUser = await user.save()

    response.json(savedUser)
  } catch (error) {
    next(error)
  }
  
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
      .populate('blogs', { url: 1, title: 1, author: 1, id: 1})
    response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter