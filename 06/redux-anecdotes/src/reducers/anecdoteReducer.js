import anecdoteService from '../services/anecdotes'
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)





export const voteAnecdote = (id) => {
  return async dispatch => {
    let anecdotes = await anecdoteService.getAll()
    const anecdoteToVote = anecdotes.filter(a => a.id === id)[0]
    const voted = anecdoteService.vote(anecdoteToVote)
    anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'VOTE',
      data: anecdotes
    })
  }
}
export const createAnecdote = (content) => {
  return async  dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    console.log(newAnecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
      
    })
    
  }
}
const sort = (anecdotes) => {
  return anecdotes.sort((a, b) => {
    if(a.votes > b.votes) {
      return -1
    } else {
      return 1
    }
  })
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      return sort(action.data)
    case 'NEW_ANECDOTE':
      return sort([...state, action.data])
    case 'INIT_ANECDOTES':
      return sort(action.data)
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer