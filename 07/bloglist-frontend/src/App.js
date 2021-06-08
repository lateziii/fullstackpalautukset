import React, { useEffect } from 'react'
import Alert from './components/Alert'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import User from './components/User'
import Logout from './components/Logout'
import NavBar from './components/NavBar'
import {initializeBlogs} from './reducers/blogReducer'
import {initializeUsers} from './reducers/userReducer'
import { useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom"





const App = (props) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])
  /*
  const match = useRouteMatch('/users/:id')
  const user = match
    ? props.users.find(user => user.id === Number(match.params.id))
    : null
    */





  
  const addBlog = () => (
    <Togglable buttonLabel="add blog">
      <CreateBlogForm></CreateBlogForm>
    </Togglable>
  )
  console.log(JSON.parse(localStorage.getItem('loggedBlogappUser')))

  return (
    <Router>
    <NavBar/>
    <div>
      <Alert/>
      <Switch>
        {typeof JSON.parse(localStorage.getItem('loggedBlogappUser')) === 'undefined' || JSON.parse(localStorage.getItem('loggedBlogappUser')) === null 
        ? <div>
          <Route path='/login'>
            <h1>Login</h1>
            <LoginForm />
          </Route>
          </div>
        : <div>
          <Route path='/users/:id'>
            <User></User>
          </Route>
          <Route path = '/blogs/:id/'>
            <Blog/>
          </Route>
          
          <Route path='/blogs'>
            <h2>blogs</h2>
            {addBlog()}
            
            {<BlogList/>}
          </Route>
          <Route path='/users'>
            <UserList /> 
          </Route>
          
          <Route path='/logout'>
            <Logout></Logout>
          </Route>
          </div>}


          
        </Switch>
    </div>
    </Router>
  )
}

export default App