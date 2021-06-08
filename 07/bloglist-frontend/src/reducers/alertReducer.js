const alertReducer = (state = nullAlert, action) => {
    switch(action.type) {
        case 'ALERT':
            return action.data
        case 'INFO':
            return action.data
        case 'RESET':
            return ''
        default:
            return state
    }
    
}

const nullAlert = {
    message: '', error: false
}
const resetNotification = () => {
    return async dispatch => {
        dispatch({
            type: 'RESET',
            data: {message: ''}
        })
    }
}
var timer = null
export const alertNotification = (message, time) => {
    return async dispatch => {
        dispatch({
            type: 'ALERT',
            data: {message, error: true}
        })
        if(timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
            dispatch(resetNotification())}, time * 1000)
    }
}
export const infoNotification = (message, time) => {
    return async dispatch => {
        dispatch({
            type: 'INFO',
            data: {message, error: false}
        })
        if(timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
            dispatch(resetNotification())}, time * 1000)
    }
}

export default alertReducer