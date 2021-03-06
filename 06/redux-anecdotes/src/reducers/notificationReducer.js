const notificationReducer = (state = nullNotification, action) => {
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
var timer = null
export const addNotification = (content, time) => {
    return async dispatch => {
        dispatch({
            type: 'ADD',
            data: {content, time}
        })
        if(timer) {
            console.log('nii')
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
         dispatch(resetNotification())}, time * 1000)
         console.log(timer)   
      
    }
}
const nullNotification = {
    content: ''
}

export const voteNotification = (content, time) => {
    return async dispatch => {
        dispatch({
            type: 'VOTENOTIFICATION',
            data: {content, time}
        })
        if(timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
         dispatch(resetNotification())}, time * 1000)  
    }
}

export const resetNotification = () => {
    return async dispatch => {
        dispatch({
            type: 'RESET',
            data: ''
        })
    }
}

export default notificationReducer

