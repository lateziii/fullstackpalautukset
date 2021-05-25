import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter.js"
import Persons from "./components/Persons.js"
import personService  from './services/persons.js'
import Alert from "./components/Alert.js"

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState()
  const [error, setError] =useState(false)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons', typeof(persons))

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
  const handleEdit = (person) => {
    const newObject = personService.update(person)
    newObject
    .then(updatedPerson => {
      setPersons(persons.map(person => (person.id !== updatedPerson.id ? person : updatedPerson)))
      setNewName('')
      setNewNumber('')
      setError(false)
      setMessage(`Changed number for ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }).catch(error => {
      setError(true)
      console.log(error)
      setMessage(`${person.name} removed already`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      }).finally(() => {
      setPersons(persons.map(p => (p.id !== person.id ? p : person)))
    })
  }
  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    console.log(newName)
    console.log(newNumber)
    const personToFind = persons.find(person => person.name === newName)
    if(personToFind){
      const response = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(response) {
        const person = persons.find(person => person.name === newName)
        return handleEdit({ ...person, number:newNumber})
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
      .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setError(false)
        setMessage(`Added ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }).catch(error => {
        console.log(error.response.data)
        setError(true)
        setMessage(`Error: ${error.response.data.error}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        
      })

      
    }
  }
  const handleRemove = (person) => {
    const response = window.confirm(`Poistetaanko ${person.name}`)
    if (response){
      personService.remove(person).then(() => {
        const newPersons = persons.filter(p => p.id !== person.id);
        setPersons(newPersons)
        setError(false)
        console.log(error)
        setMessage(`Removed ${person.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      }).catch(error => {
        setError(true)
        console.log(error)
        setMessage(`${person.name} removed already`)
        setTimeout(() => {
        setMessage(null)
      }, 5000)
      }).finally(() => {
        const newPersons = persons.filter(poistettu => poistettu.id !== person.id)
        setPersons(newPersons)
      })
    }
  }

 
  return (
    <div>
      <Alert message={message}error={error}></Alert>
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
        <div><Persons persons={persons}filter={newFilter}onRemove={handleRemove}/></div>
    </div>
  )

}

export default App