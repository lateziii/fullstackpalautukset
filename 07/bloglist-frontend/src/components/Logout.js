import React from 'react'
import { logout } from '../reducers/userReducer'
import { useHistory } from "react-router-dom"
import loginService from '../services/login'

const Logout = () => {
    const history = useHistory()
    const handleLogout = async () => {
        loginService.logout()
        history.push('/login')
        window.location = '/login'
    }
    handleLogout()
}
export default Logout