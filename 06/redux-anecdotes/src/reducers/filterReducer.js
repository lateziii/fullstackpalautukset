const filterReducer = (state = '', action) => {
    switch(action.type) {
        case 'FILTER':
            return action.data.content
        default:
            return state
    }
}
export const changeFilter = (content) => {
    return {
      type: 'FILTER',
      data: { content }
    }
  }

export default filterReducer