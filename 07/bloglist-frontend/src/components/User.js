import React from 'react'
import { connect } from 'react-redux'
import {
    useParams,
  } from "react-router-dom"

const User = (props) => {
    const id = useParams().id
    const user = props.users.find(user => user.id === id) 
    return(
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            {user.blogs.map(blog => {
                return(
                    <div>
                        <li>{blog.title}</li>
                    </div>
                )
                })}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {users: state.users}
}
const mapDispatchToProps = {

}
const ConnectedUser = connect(mapStateToProps, mapDispatchToProps)(User)

export default ConnectedUser