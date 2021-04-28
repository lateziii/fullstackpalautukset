import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/Filter.js"
import Person from "./components/Person.js"
import Persons from "./components/Persons.js"

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState([])
  const [newNumber, setNewNumber] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    console.log(newName)
    console.log(newNumber)
    console.log(Object.entries(persons))
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={setNewFilter}>
        <div>
          <Filter onFilterChange={handleFilterChange} filter={newFilter}/>
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
        name: <input value={newName}onChange={handleNameChange} />
        </div>
        <div>
        number: <input value={newNumber}onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <Persons persons={persons}filter={newFilter}/>
    </div>
  )

}

export default App