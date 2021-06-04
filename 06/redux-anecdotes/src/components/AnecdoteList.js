import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { voteNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

    const vote = async (id) => {
        props.voteAnecdote(id)
        const anecdote = props.anecdotes.filter(a => 
             a.id === id
        )[0]
        props.voteNotification(`you voted ${anecdote.content}`, 3)  
    }

    return(
        <div>
            {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}
const mapStateToProps = (state) => {
  if(state.filter==='') {
    return {anecdotes: state.anecdotes}
  } else {
    return {anecdotes: state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))}
  }
}
const mapDispatchToProps = {
 voteAnecdote,
 voteNotification,
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotes
