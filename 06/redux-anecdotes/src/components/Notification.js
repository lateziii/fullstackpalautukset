
import React from 'react'
import { connect } from 'react-redux'


const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div>
      { props.notification !== null ? <div style={style}> {props.notification}</div>:null}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {notification: state.notifications.content}
}
const ConnectedNotifications = connect(mapStateToProps)(Notification)
export default ConnectedNotifications