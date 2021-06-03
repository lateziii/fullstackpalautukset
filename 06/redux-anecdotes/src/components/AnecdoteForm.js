import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { addNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()
    

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(addNotification(content))
        setTimeout(() => {
            dispatch(resetNotification(event))}, 5000
        )
      }

    return(
    <div>
        <h2>create new</h2>
      <form onSubmit={(event) => addAnecdote(event)}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>)
}

export default AnecdoteForm