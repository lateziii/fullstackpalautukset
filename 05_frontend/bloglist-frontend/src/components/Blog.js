import React from 'react'
import Togglable from './Togglable'
import '../styles/Blog.css'

const Blog = ({blog, addLikeHandler, removeHandler}) => {

  const getUser = () => {
    
    try {
      const user = JSON.parse(localStorage.getItem('loggedBlogappUser'))
      return user
    } catch (exeption) {
      return null
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
          <li>
            likes {blog.likes} <button id='like' onClick={() => addLikeHandler(blog)}>like</button>
          </li>
          <li>
            {blog.user.name}
          </li>
          <li>
          {getUser() === blog.user.username && (
            <div>
              <button id='delete' onClick={() => removeHandler(blog)}>remove</button>
            </div>    
          )}
          </li>
        </ul>
      </Togglable>
    </div>  
  )
  }
export default Blog