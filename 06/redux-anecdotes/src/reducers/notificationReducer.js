const notificationReducer = (state = '', action) => {
    switch(action.type) {
        case 'ADD':
            return action.data
        case 'VOTENOTIFICATION':
            return action.data
        case 'RESET':
            return ''
        default:
            return state
    }
}

export const addNotification = (content) => {
    return {
      type: 'ADD',
      data: `you added, ${content}`
    }
}

export const voteNotification = (content) => {
    return {
      type: 'VOTENOTIFICATION',
      data: `you voted, ${content}`
    }
}

export const resetNotification = () => {
    return {
      type: 'RESET',
      data: ''
    }
}

export default notificationReducer

