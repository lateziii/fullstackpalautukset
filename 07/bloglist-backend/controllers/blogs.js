const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const { isString } = require('lodash')

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(404).send('not found')
    }
    response.json(blog.toJSON())

    
})

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1, id :1 })

      response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
    const body = request.body
    try {
        const token = request.token
        const decodedToken = jwt.verify(token, process.env.SECRET)

    } catch (exception) {
        return response.status(401).end()
    }
    
    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    
    
    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
    
})

blogsRouter.delete('/:id', middleware.userExtractor,  async (request, response, next) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        response.status(401).json({ error: 'token missing or invalid' }).end()
    }
    const user = request.user
    console.log('id: ', request.params.id)
    try {
        const blog = await Blog.findById(request.params.id)

        if (!blog) {
            response.status(404).send('not found').end()
        }
        if (user.id.toString() === blog.user.toString()) {
            await blog.remove()
            response.status(204).send('not authorized').end()
        } else{
            response.status(401).end()
        }
    } catch (error) {
        next(error)
    }
    
})

blogsRouter.put('/:id', async (request, response, next) => {

    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(404).send('not found')
    }
    console.log(request.body.comment)
    console.log(blog)
    if(request.body.comment ==! null) {
        const editedBlog = {
            title: request.body.title || blog.title,
            author: request.body.author || blog.author,
            url: request.body.url || blog.url,
            likes: request.body.likes || blog.likes,
            comments: blog.comments.concat(request.body.comment),
        }
        const result = await Blog.findByIdAndUpdate(request.params.id, editedBlog, { new: true })
        response.status(200).send(result)
    } else {
        const editedBlog = {
            title: request.body.title || blog.title,
            author: request.body.author || blog.author,
            url: request.body.url || blog.url,
            likes: request.body.likes || blog.likes,
            comments: blog.comments,
        }
            const result = await Blog.findByIdAndUpdate(request.params.id, editedBlog, { new: true })
            response.status(200).send(result)
    }
})

blogsRouter.put('/id'), async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(404).send('not found')
    }

    
    const result = await blog.save()
    response.status(200).send(result)
}

module.exports = blogsRouter