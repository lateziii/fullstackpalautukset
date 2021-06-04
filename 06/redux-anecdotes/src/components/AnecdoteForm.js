import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { addNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {


    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.addNotification(`you added ${content}`, 3)
        
      }

    return(
    <div>
        <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>)
}

const mapDispatchToProps = {
  createAnecdote,
  addNotification,
}

const ConnectedAnecdotes = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdotes