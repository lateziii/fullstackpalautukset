import React, {useState} from 'react'
import {useQuery, useMutation } from '@apollo/client'
import {ALL_AUTHORS, EDIT_BIRTH} from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [changeBirth] = useMutation(EDIT_BIRTH, {
    refetchQueries: [ { query: ALL_AUTHORS }]
  })

  const [author, setAuthor] = useState('')
  const [birth, setBirth] = useState('')


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const birthToNumber = Number(birth)
      changeBirth({variables: {name: author, setBornTo: birthToNumber}})
      setBirth('')
    } catch (error) {
      setBirth('')
      console.log(error)

    }
  }

  if(result.loading) {
    return(<div>loading...</div>)
  }
  if (!props.show) {
    return null
  }
const authors = result.data.allAuthors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr key='tiedot'>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}> 
        <h2>Set birthyear</h2>
        <select onChange={({ target }) => setAuthor(target.value)}>
          {authors.map(a => 
            <option key={a.name} name='author' value={a.name}>{a.name}</option>)}
        </select>
        <div>
          <label>born</label>
        <input
        type='number' value={birth} onChange={({ target }) => setBirth(target.value)}></input>
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors