import React from 'react'
import {Link} from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import MenuIcon from '@material-ui/icons/Menu'



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const NavBar = () => {
    const classes = useStyles();
    const padding = {
        padding: 5
      }
    if(JSON.parse(localStorage.getItem('loggedBlogappUser')) !== null) {
        const user = JSON.parse(localStorage.getItem('loggedBlogappUser'))
    }

    return (
        <AppBar position="static">
          <Toolbar>
              <ButtonGroup>
                <Button color='secondary' variant='outlined'><Link style={padding} to="/">home</Link></Button>
                <Button color='secondary' variant='outlined'><Link style={padding} to="/users">users</Link></Button>
                <Button color='secondary' variant='outlined'><Link style={padding} to='/blogs'>blogs</Link></Button>
              </ButtonGroup>
              <ButtonGroup>
                {typeof JSON.parse(localStorage.getItem('loggedBlogappUser')) === 'undefined' || JSON.parse(localStorage.getItem('loggedBlogappUser')) === null 
                  ? <Button color='secondary' variant='outlined'><Link style={padding} className='button' to="/login">login</Link></Button>
                  : <div style={padding}>{JSON.parse(localStorage.getItem('loggedBlogappUser'))} logged in<Button color='secondary' variant='outlined'><Link style={padding} to='/logout' className="button">Logout</Link></Button></div>
                }
              </ButtonGroup>
          </Toolbar>
        </AppBar>)
}
export default NavBar