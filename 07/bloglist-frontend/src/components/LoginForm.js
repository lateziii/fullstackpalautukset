import React from 'react'
import {connect} from 'react-redux'
import Togglable from './Togglable'
import {login, logout} from '../reducers/userReducer'
import { alertNotification, infoNotification } from '../reducers/alertReducer'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography  from '@material-ui/core/Typography'

const LoginForm = (props) => {
  const history = useHistory()

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('häh')
        const username = event.target.username.value
        const password = event.target.password.value
        try {
          const user = await props.login({
            username, password
          })
          event.target.username.value = ''
          event.target.password.value = ''
          history.push('/')
          window.location = '/blogs'
        } catch (exception) {
          console.log(exception)
          props.alertNotification('wrong credentials!', 5)
        }
      }
      return (
        <div>
          <form onSubmit={handleLogin}>
            <div>
              <Typography>username</Typography>
                <TextField
                type="text"
                name="username"
              />
            </div>
            <div>
              <Typography>password</Typography>
                <TextField
                type="password"
                name="password"
              />
            </div>
            <Button color='primary' variant='contained' type="submit">login</Button>
          </form>
        </div>
      )
    
}
/*
LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}
*/
const mapDispatchToProps = {
  login,
  logout,
  alertNotification,
  infoNotification
}
const ConnectedLogins = connect(null, mapDispatchToProps)(LoginForm)

export default ConnectedLogins