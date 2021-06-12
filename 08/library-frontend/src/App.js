import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import Login from './components/Login'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { GET_USER, ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const user = useQuery(GET_USER)

  const updateCacheWith = (addedBook) => {
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      dataInStore.allBooks.push(addedBook)
      client.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const added = subscriptionData.data.bookAdded
      window.alert(`${added.title} added`)
    }
  })

  if(user.loading) {
    return(<div>loading...</div>)
  }
  const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id) 

  

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  if (!token) {
    return(
      <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />
      <Login
        show={page === 'login'} setToken={setToken}
      />

    </div>
  )
}

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />
      <Login
        show={page === 'login'} setToken={setToken}
      />
      <Recommended show={page ==='recommended'} user={user.data.me.username} favorite={user.data.me.favoriteGenre}/>

    </div>
  )
}

export default App