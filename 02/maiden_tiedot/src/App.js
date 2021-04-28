import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter.js'
import Countries from './components/Countries.js'


const App = (props) => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countrys')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <form onSubmit={setFilter}>
        <div>
          <Filter onFilterChange={handleFilterChange} filter={filter}/>
        </div>
      </form>
      <div>
      <Countries countries={countries}filter={filter}/>
      </div>
    </div>
  );
}

export default App;
