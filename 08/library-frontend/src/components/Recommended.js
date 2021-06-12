import React, {useEffect, useState} from 'react'
import { useQuery} from '@apollo/client'
import {FIND_BOOKS} from '../queries'

const Recommended = (props) => {
    const filteredResult = useQuery(FIND_BOOKS, {variables: {genre: props.favorite}})
    const [books, setBooks] = useState([])
    
    useEffect(() => {
        if (filteredResult.data) {
          setBooks(filteredResult.data.allBooks)
        }
      }, [filteredResult])
    if (!props.show) {
        return null
      }

    return(
        <div>
            <h1>recommendations</h1>
            <p>books in your favorite genre <b>{props.favorite}</b> </p>
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

export default Recommended