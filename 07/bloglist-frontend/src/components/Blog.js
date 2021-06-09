import React, {useEffect} from 'react'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { connect, useDispatch } from 'react-redux'
import {initializeBlog} from '../reducers/blogReducer'
import {
    Redirect,
    useParams
  } from "react-router-dom"

import Card  from '@material-ui/core/Card'
import Button  from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const Blog = (props) => {
    
    const id = useParams().id
    

    const blog = props.blogs.find(blog => blog._id === id)
    const comments = blog.comments

    const like = (event) => {
        props.likeBlog(blog) 
    }
    const comment = (event) => {
        event.preventDefault()
        const comment = event.target.comment.value
        const commentedBlog = {...blog, comment}
        props.commentBlog(commentedBlog)
        event.target.comment.value = ''
    }
    
      const remove =  async (blog) => {
        
        const response = window.confirm(`Poistetaanko ${blog.title}`)
        if (response) {
          props.deleteBlog(blog)
          }
    }

    const getUser = () => {
    
        try {
          const user = JSON.parse(localStorage.getItem('loggedBlogappUser')).username
          return user
        } catch (exeption) {
          return null
        }
      }

    return (
        <Card>
        <h2>{blog.title} – {blog.author}</h2>
                  <p>{blog.url}</p>
                  <p> likes {blog.likes} <Button color='primary' variant='contained' id='like' onClick={() => like(blog)}>like</Button></p>
                  <p>added by {blog.user.name}</p>
                  {getUser() === blog.user.username && (
                    <p>
                        <Button color='primary' variant='contained' id='delete' onClick={() => remove(blog)}>remove</Button>
                  </p>)}
                  <h3>comments</h3>
                  {comments.map(comment => {
                      return(
                        <li>{comment}</li>
                    )
                  })}
                  <h3>add own comment</h3>
                  <form onSubmit={comment}>
                  <TextField name="comment" type='text'></TextField>
                  <Button color='primary' variant='contained' type='submit'>comment</Button>
                  </form>
                      
                  
        </Card>
    )
}
const mapStateToProps = (state) => {
    return {blogs: state.blogs}
}
const mapDispatchToProps = {
    likeBlog,
    deleteBlog,
    commentBlog
}
const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default ConnectedBlog