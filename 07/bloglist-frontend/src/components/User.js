import React from 'react'
import { connect } from 'react-redux'
import {
    useParams,
  } from "react-router-dom"

import Card  from '@material-ui/core/Card'

const User = (props) => {
    const id = useParams().id
    const user = props.users.find(user => user.id === id) 
    return(
        <Card>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            {user.blogs.map(blog => {
                return(
                    <div>
                        <li>{blog.title}</li>
                    </div>
                )
                })}
        </Card>
    )
}

const mapStateToProps = (state) => {
    return {users: state.users}
}
const mapDispatchToProps = {

}
const ConnectedUser = connect(mapStateToProps, mapDispatchToProps)(User)

export default ConnectedUser