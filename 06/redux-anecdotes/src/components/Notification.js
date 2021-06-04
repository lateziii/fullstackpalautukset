
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'


const Notification = () => {
  const dispatch = useDispatch()
  let notification = useSelector(state => state.notifications.content)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      { notification }
    </div>
  )
}

export default Notification