import React from 'react'
import '../styles/Blog.css'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import {
  useParams,
  Link
} from "react-router-dom"

import '../styles/Blog.css'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const BlogList = (props) => {

    return(
        <Table>
          <TableBody>
            {props.blogs.map(blog => {
              return (
                  <TableRow key={blog._id}>
                    <TableCell><Button><Link to={`/blogs/${blog._id}`}>{blog.title} – {blog.author}</Link></Button></TableCell>                
                </TableRow>  
              )
            })}
          </TableBody>
        </Table>
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