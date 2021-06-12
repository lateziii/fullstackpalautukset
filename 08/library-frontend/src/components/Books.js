
import React, {useEffect, useState} from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import {ALL_BOOKS, FIND_BOOKS} from '../queries'


const Books = (props) => {
  
  const result = useQuery(ALL_BOOKS)
  const [getBooks, filteredResult] = useLazyQuery(FIND_BOOKS)
  const [books2, setBooks] = useState([])
  const [target, setTarget] = useState('')
  useEffect(() => {
    if (filteredResult.data) {
      setBooks(filteredResult.data.allBooks)
    }
  }, [filteredResult])
  if (!props.show) {
    return null
  }

  if(result.loading) {
    return(<div>loading...</div>)
  }
  const books = result.data.allBooks
  const genres = books.map(book => book.genres)
  const uniqGenres = []
  for (var i in genres) {
    for (var j in genres[i]){
      if (!uniqGenres.includes(genres[i][j])){
        uniqGenres.push(genres[i][j])
      }
    }
    
  }
  const selectGenre = (event) => {
    event.preventDefault()
    getBooks({ variables: { genre: target } })
  }
  if(books2.length > 0) {
    return(
      <div>
      <h2>books</h2>
      <form onSubmit={selectGenre}>
      <select onChange={({ target }) => setTarget(target.value)}>
              {uniqGenres.map(g => 
                <option key={g} value={g}>{g}</option>)}
      </select>
      <button type='submit'>filter</button>
      <button onClick={() => setBooks([])}>clear</button>
      </form>
      <table>
        <tbody>
          <tr key='info'>
            <th>title</th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books2.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    )
  }

  return (
    <div>
      <h2>books</h2>
      <form onSubmit={selectGenre}>
      <select onChange={({ target }) => setTarget(target.value)}>
              {uniqGenres.map(g => 
                <option key={g} value={g}>{g}</option>)}
      </select>
      <button type='submit'>filter</button>
      </form>
      <table>
        <tbody>
          <tr key='info'>
            <th>title</th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books