const listHelper = require('../utils/list_helper')
const testilista = [
    {
        "_id": "435",
        "title": "eka",
        "author": "minä",
        "url": "eka",
        "likes": 42   
    },
    {
        "_id": "1234",
        "title": "toka",
        "author": "sinä",
        "url": "toka",
        "likes": 2   
    }, 
    {
        "_id": "12345678",
        "title": "kolmas",
        "author": "hän",
        "url": "uusi",
        "likes": 3   
    }, 
    {
        "_id": "5431",
        "title": "neljäs",
        "author": "me",
        "url": "neljäs",
        "likes": 10   
    }, 
    {
        "_id": "235",
        "title": "viides",
        "author": "minä",
        "url": "viides",
        "likes": 12   
    },  
]
const blogs = []

test('dummy palauttaa aina numeron yksi', () => {
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})
describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
    test('of a empty list is zero', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
    test('of a bigger list is calculated right', () => {
      const result = listHelper.totalLikes(testilista)
      expect(result).toBe(69)
    })
    
  })

describe('the blog with most likes', () => {
    test('from testilista it is the first object', () => {
        const result = listHelper.favoriteBlog(testilista)
        expect(result).toEqual(testilista[0])
    })
})

describe('the author with most blogs', () => {
    test('from testilista it is minä', () => {
        const result = listHelper.mostBlogs(testilista)
        expect(result).toEqual({author: "minä", blogs: 2})
    })
})
describe('the author with most likes', () => {
    test('from testilista it is minä', () => {
        const result = listHelper.mostLikes(testilista)
        expect(result).toEqual({author: "minä", likes: 54})
    })
})
