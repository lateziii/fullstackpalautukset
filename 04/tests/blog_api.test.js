const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')


const Blog = require('../models/blog')
const User = require('../models/user')

let token1 = ''
beforeEach(async () => {
    await Blog.deleteMany({})

    await User.deleteMany({})

    const user = helper.initialUsers[0]
    await api
      .post('/api/users')
      .send(user)
    const log = await api.post('/api/login').send(user)
    token1 = `bearer ${log.body.token}`
    await api.post('/api/blogs').send(helper.initialBlogs[0]).set('Authorization', token1)
    await api.post('/api/blogs').send(helper.initialBlogs[1]).set('Authorization', token1)

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
            .send(newBlog).set('Authorization', token1)
            .expect('Content-Type', /application\/json/)
    
        const blogs = await helper.blogsInDb()
        const titles = blogs.map(blog => blog.title)
        expect(blogs).toHaveLength(helper.initialBlogs.length +1)
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
            .send(noLikesBlog).set('Authorization', token1)
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
            .send(noTitleBlog).set('Authorization', token1)
            .expect(400)
    })

    const noUrlBlog = {
        "title": "kolmas",
        "author": "hän"
    }

    test('status 400 if there is no url in blog', async () => {
        await api
            .post('/api/blogs')
            .send(noUrlBlog).set('Authorization', token1)
            .expect(400)
    })
    test('status 401 when there is no token provided', async() => {
        await api
        .post('/api/blogs')
        .send(helper.initialBlogs[0])
        .expect(401)
        
    })
})

afterAll(() => {
    mongoose.connection.close()
})
