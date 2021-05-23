import React from 'react';

const Alert =({message, error}) => {
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
    if (message === null){
        return null
    }
    if (error)
    return (
        <div style={errorStyle}>
            {message}
        </div>
    )
    if (!error)
    return (
        <div style={successStyle}>
            {message}
        </div>
    )
}
export default Alert