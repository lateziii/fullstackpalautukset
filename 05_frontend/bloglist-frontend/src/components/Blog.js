import React, { useState} from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import '../styles/Blog.css'

const Blog = ({blog}) => {
  const [likes, setLikes] = useState(blog.likes)


  const addLike = () => {
    const likedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes +1,
      _id: blog._id
    }
    blogService.update(likedBlog)
    setLikes(blog.likes +1)
  }
  const getUser = () => {
    
    try {
      const user = JSON.parse(localStorage.getItem('loggedBlogappUser'))
      return user
    } catch (exeption) {
      return null
    }
  }
  const remove = () => {
    blogService.setToken(localStorage.getItem('token'))
    const response = window.confirm(`Poistetaanko ${blog.title}`)
    if (response) {
      const removable = {
        _id: blog._id
      }
      blogService.remove(removable)
    }
    
  }

  return (
    <div className="blog">
      <Togglable buttonLabel="view" content1={blog.title} content2={blog.author}>
        <ul>
        <li key={blog.title}>
            {blog.title} – {blog.author}
          </li>
          <li key={blog.url}>
            {blog.url}
          </li>
          <li key={blog.likes}>
            likes {likes} <button onClick={addLike}>like</button>
          </li>
          <li key={blog.user.name}>
            {blog.user.name}
          </li>
          <li key={blog.user.username}>
          {getUser() === blog.user.username && (
            <div>
              <button onClick={remove}>remove</button>
            </div>    
          )}
          </li>
        </ul>
      </Togglable>
    </div>  
  )
  }
export default Blog