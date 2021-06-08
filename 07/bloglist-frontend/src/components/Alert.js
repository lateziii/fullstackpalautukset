import React from 'react'
import { connect } from 'react-redux'

const Alert =(props) => {
    const successStyle={
        color: 'green',
        background: 'lightgrey',
        fontSize: 20
      }
      const errorStyle={
        color: 'red',
        background: 'lightgrey',
        fontSize: 20
      } 
    if (props.message === null){
        return null
    }
    if (props.error)
    return (
        <div style={errorStyle}>
            {props.message}
        </div>
    )
    if (!props.error)
    return (
        <div style={successStyle}>
            {props.message}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {message: state.alerts.message, error: state.alerts.error}
}
const ConnectedAlerts = connect(mapStateToProps)(Alert)
export default ConnectedAlerts