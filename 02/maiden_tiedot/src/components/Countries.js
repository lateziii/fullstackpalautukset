import React, {useState} from 'react'
import Weather from './Weather.js'

const Country = ({country}) => {
    const [show, setShow] = useState(false)

    const handleShowChange = () => {
        setShow(!show)
    }
    if (show) {
        return (
            <div>
                <CountryInDetail key={country.name} country={country}/>
            </div>
        )
    } else {
        return(
            <p>{country.name}<button onClick={handleShowChange}>show</button></p>
        )
    }
    
}

const showCountry = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    console.log()
}


const CountryInDetail = ({country}) => {

    return(
        <div>
            <h2>{country.name}</h2>
            <p>capital {country.capital}<br></br>
            population {country.population} </p>
            <h3>languages</h3>
            <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <br></br>
      <img width="250px" src={country.flag} alt="flag" />
      <Weather city={country.capital}/>
        </div>
    )
}
const Countries = ({countries, filter}) => {
    console.log(filter)
    const filterilla = countries.filter(country =>
         country.name.toLowerCase().includes(filter.toLowerCase()));
         console.log(filterilla)
    const pituus = filterilla.map((country)=>
    <Country key={country.name} country={country}/>).length
    if (pituus > 10) {
        return(
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    } if (pituus === 1){
        return(
            <div>
               {filterilla.map((country)=>
                <CountryInDetail key={country.name} country={country}/>)}
            </div>
        )
    }
     else {
        return (
            <div>
                <form onSubmit={showCountry}>
                    {filterilla.map((country)=>
                    <Country key={country.name} country={country}/>)}
                </form>
            </div>
        )
    }
    
}
export default Countries
