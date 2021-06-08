import React from 'react'
import {connect} from 'react-redux'
import Togglable from './Togglable'
import {login, logout} from '../reducers/userReducer'
import { alertNotification, infoNotification } from '../reducers/alertReducer'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom'

const LoginForm = (props) => {
  const history = useHistory()

    const handleLogin = async (event) => {
        event.preventDefault()
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
              username
                <input
                type="text"
                name="username"
              />
            </div>
            <div>
              password
                <input
                type="password"
                name="password"
              />
            </div>
            <button type="submit">login</button>
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