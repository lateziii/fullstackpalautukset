import React from 'react'
import Togglable from './Togglable'
import '../styles/UserList.css'
import { connect } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch,
    useHistory,
  } from "react-router-dom"
  

const UserList = (props) => {
    return(
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <td></td>
                        <td><strong>blogs created</strong></td>
                    </tr>

                    {props.users.map(user => {
                        return(
                            <tr key={user.id}>
                                    <td ><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                                    <td> {user.blogs.length}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    ) 
}
const mapStateToProps = (state) => {
    return {users: state.users}
}
const mapDispatchToProps = {

}
const ConnectedUsers = connect(mapStateToProps, mapDispatchToProps)(UserList)

export default ConnectedUsers
