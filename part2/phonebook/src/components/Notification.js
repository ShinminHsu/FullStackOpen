import React from 'react'

const Notification = ({ message, type }) => {
    let boxStyle
    
    if ( type === 'Add' ) {
      boxStyle = {
        color: 'green'
      }
    } else if ( type === 'Error' ) {
      boxStyle = {
        color: 'red'
      }
    }

    if (message === null) {
      return null
    }
  
    return (
      <div className="notificationBox" style={boxStyle}>
        {message}
      </div>
    )
  }

export default Notification