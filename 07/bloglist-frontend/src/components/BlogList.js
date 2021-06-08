import React from 'react'
import '../styles/Blog.css'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import {
  useParams,
  Link
} from "react-router-dom"

const BlogList = (props) => {

    return(
        <div>
          {props.blogs.map(blog => {
            return (
                <div key={blog._id} className="blog">
                  <Link to={`/blogs/${blog._id}`}>{blog.title} – {blog.author}</Link>                
              </div>  
            )
          })}
        </div>
      )
}

const mapStateToProps = (state) => {
    return {blogs: state.blogs}
}
const mapDispatchToProps = {
    likeBlog,
    deleteBlog
}
const ConnectedBlogs = connect(mapStateToProps, mapDispatchToProps)(BlogList)

export default ConnectedBlogs