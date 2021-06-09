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

  import Table from '@material-ui/core/Table'
  import TableBody from '@material-ui/core/TableBody'
  import TableRow from '@material-ui/core/TableRow'
  import TableCell from '@material-ui/core/TableCell'
  

const UserList = (props) => {
    return(
        <div>
            <h2>users</h2>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell><TableRow>blogs created</TableRow></TableCell>
                    </TableRow>

                    {props.users.map(user => {
                        return(
                            <TableRow key={user.id}>
                                    <TableCell ><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                                    <TableCell> {user.blogs.length}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
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
