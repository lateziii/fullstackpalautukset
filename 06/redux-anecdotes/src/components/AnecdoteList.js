import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { voteNotification, resetNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
      if(state.filter==='') {
        return state.anecdotes
      } else {
        return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
      }
    })
  

    const vote = (id) => {
        dispatch(voteAnecdote(id))
        const anecdote = anecdotes.filter(a => {
            return a.id === id
        })[0]
        dispatch(voteNotification(anecdote.content))
        setTimeout(() => {
            dispatch(resetNotification())}, 5000
        )
    }

    return(
        <div>
            {anecdotes.map(anecdote =>
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

export default AnecdoteList
