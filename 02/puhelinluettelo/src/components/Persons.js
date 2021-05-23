import React from 'react'
import Person from "./Person.js";

const Persons = ({persons, filter, onRemove}) => {
    const filterilla = persons.filter(person =>
         person.name.toLowerCase().includes(filter.toLowerCase()));
         console.log(filterilla)
    return (
        <div>
            {filterilla.map((person)=>
            <Person key={person.name} person={person} onRemove={onRemove}/>)}
        </div>
    )
}
export default Persons