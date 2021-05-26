const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
    .find({})
    .then(blogs => {
    response.json(blogs)
    })
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes   
    })

    try {
        const savedBlog = await blog.save()
        console.log('blog', blog)
        console.log('saved', savedBlog)
        response.json(savedBlog.toJSON())
            
    } catch (expection) {
        next(expection)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const blog = await Blog.findByIdAndDelete(request.params.id)
    if (!blog) {
        return response.status(404).send('not found')
    }
    if (req.user.id.toString === blog.user.toString()) {
        await blog.remove()
        return response.status(204)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {

    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(404).send('not found')
    }
    const editedBlog = {
        title: request.body.title || blog.title,
        author: request.body.author || blog.author,
        url: request.body.url || blog.url,
        likes: request.body.likes || blog.likes
    }
    const result = await Blog.findByIdAndUpdate(request.params.id, editedBlog, { new: true })
    response.status(200).send(result)
})

module.exports = blogsRouter