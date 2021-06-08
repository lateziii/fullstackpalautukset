import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

    const sort = (blogs) => {
        return blogs.sort((a, b) => {
          if(a.likes > b.likes) {
            return -1
          } else {
            return 1
          }
        })
    }

    switch(action.type) {
      case 'LIKE':
        return sort(action.data)
      case 'NEW_BLOG':
          console.log(action.data)
        return sort([...state, action.data])
      case 'INIT_BLOGS':
        return sort(action.data)
      case 'INIT_BLOG':
          return action.data
      case 'COMMENT_BLOG':
          return action.data
        case 'DELETE':
            return sort(action.data)
      default:
        return state
    }
}


export const createBlog = (blog) => {
    return async dispatch => {
        blogService.setToken(localStorage.getItem('token'))
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }   
}

export const likeBlog = (blog) => {
    return async dispatch => {
        await blogService.like(blog)
        const blogs = await blogService.getAll()
        dispatch({
            type: 'LIKE',
            data: blogs
        })
    }
}
export const deleteBlog = (blog) => {
    return async dispatch => {
        blogService.setToken(localStorage.getItem('token'))
        await blogService.remove(blog)
        const blogs = await blogService.getAll()
        dispatch({
            type: 'DELETE',
            data: blogs
        })
    }
}
export const commentBlog = (blog) => {
    return async dispatch => {
        await blogService.comment(blog)
        const blogs = await blogService.getAll()
        dispatch({
            type: 'COMMENT_BLOG',
            data: blogs
        })
    }
}
export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}
export const initializeBlog = () => {
    return async dispatch => {
        const blog = await blogService.getOne()
        dispatch({
            type: 'INIT_BLOG',
            data: blog
        })
    }
}

export default blogReducer