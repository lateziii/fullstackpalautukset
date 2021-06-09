import loginService from '../services/login'
import userService from '../services/users'
import blogService from '../services/blogs'

const emptyState = []

const userReducer = (state = [], action) => {
    switch(action.type) {
        case 'LOGIN':
            console.log(action.data)
            return [...action.data.username]
        case 'LOGOUT':
            return emptyState
        case 'CHECK_USER':
            return action.data
        case 'INIT_USERS':
            return action.data
        default: 
            return state
    }
}

export const login = (username, password) => {
    return async dispatch => {
        const user = await loginService.login(username, password)
        blogService.setToken(user.token) 
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(username))
        window.localStorage.setItem('token', user.token)
        window.localStorage.setItem('id', user.id)
        dispatch({
            type: 'LOGIN',
            data: user
        })
    }

}
export const checkUser = () => {
    return async dispatch => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
            if (loggedUserJSON) {
              const user = JSON.parse(loggedUserJSON)
              console.log(user)
              blogService.setToken(user.token)
              dispatch({
                  type: 'CHECK_USER',
                  data: user.username
              })
            }
          
          } catch (error) {
            
          }
    }
}

export const initializeUsers = () => {
    console.log('nii')
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: 'INIT_USERS',
            data: users
        })
    }
}

export const logout = () => {
    return async dispatch => {
        window.localStorage.clear()
        dispatch({
            type: 'LOGOUT'
        })
    }

}

export default userReducer