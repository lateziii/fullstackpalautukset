import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/NavBar.css'

const NavBar = () => {
    const padding = {
        padding: 5
      }

    return (
        <div className='inlineStyle'>
            <p><Link style={padding} to="/">home</Link>
            <Link style={padding} to="/blogs">blogs</Link>
            <Link style={padding} to="/users">users</Link>
            
            {typeof JSON.parse(localStorage.getItem('loggedBlogappUser')) === 'undefined' || JSON.parse(localStorage.getItem('loggedBlogappUser')) === null 
            ? <li><Link style={padding} className='button' to="/login">login</Link></li>
            : <li>{JSON.parse(localStorage.getItem('loggedBlogappUser')).username} logged in   <Link style={padding} to='/logout' className="button">Logout</Link></li>
            
        }
        </p>
        </div>)
}
export default NavBar