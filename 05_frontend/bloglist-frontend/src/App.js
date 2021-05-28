import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Blog from './components/Blog'
import Alert from './components/Alert'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login' 
import CreateBlogForm from './components/CreateBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')


  useEffect(() => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
    
    } catch (error) {
      
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => (a.likes < b.likes) ? 1: -1)
      setBlogs( sortedBlogs )
    })  
  }, [])
    


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log(user.token)
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(username))
      window.localStorage.setItem('token', user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({message:'wrong credentials', error:true})
      setTimeout(() => {
        setMessage('')}, 5000
      )
    }
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title, author, url
    }
    blogService.setToken(localStorage.getItem('token'))
    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setMessage({message:`a new blog ${title} by ${author} added `, error:false})
      setTimeout(() => {
        setMessage('')}, 5000
      )
      setTitle('')
      setAuthor('')
      setUrl('')
    }).catch(error => {
      setMessage({message:`Failure`, error:true})
      setTimeout(() => {
        setMessage('')}, 5000
      )
    })
    
    
    
  }

  const loginForm = () => (
    <Togglable buttonLabel = "log in ">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      </Togglable>
  )
  loginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

  const blogForm = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  const addBlog = () => (
    <Togglable buttonLabel="add blog">
      <CreateBlogForm handleNewBlog={handleNewBlog} title={title} author={author} url={url} setTitle={setTitle}
       setAuthor={setAuthor} setUrl={setUrl}></CreateBlogForm>
    </Togglable>
  )

  return (
    <div>
      <Alert message={message.message} error={message.error}></Alert>
      {user === null ? loginForm()
      : <div>
          <h2>blogs</h2>
          <p>{ user.username || user } logged in</p>
         {addBlog()}{blogForm()} 
        </div>}
      
    </div>
  )
}

export default App