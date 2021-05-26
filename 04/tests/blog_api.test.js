const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const { initialBlogs } = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs returned include id', async () => {
    const result = await api.get('/api/blogs').expect(200)
    result.body.forEach(blog => {
        expect(blog.id).toBeDefined
    })
})
describe('POST', () => {
    const newBlog = {
        "title": "kolmas",
        "author": "hän",
        "url": "uusi",
        "likes": 3   
    }
    
    test('POST add blogs to /api/blogs', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect('Content-Type', /application\/json/)
    
        const blogs = await helper.blogsInDb()
        const titles = blogs.map(blog => blog.title)
        expect(blogs).toHaveLength(initialBlogs.length +1)
        expect(titles).toContain(
            'kolmas'
        )
    })
    
    const noLikesBlog = {
        "title": "kolmas",
        "author": "hän",
        "url": "uusi"  
    }
    
    test('POST a blog without value likes and the blog has 0 likes', async () => {
        const posted = await api
            .post('/api/blogs')
            .send(noLikesBlog)
            .expect('Content-Type', /application\/json/)
    
        expect(posted.body.likes).toBe(0)
    })
    const noTitleBlog = {
        "author": "hän",
        "url": "uusi"  
    }

    test('status 400 if there is no title in blog', async () => {
        await api
            .post('/api/blogs')
            .send(noTitleBlog)
            .expect(400)
    })

    const noUrlBlog = {
        "title": "kolmas",
        "author": "hän"
    }

    test('status 400 if there is no url in blog', async () => {
        await api
            .post('/api/blogs')
            .send(noUrlBlog)
            .expect(400)
    })
})

afterAll(() => {
  mongoose.connection.close()
})