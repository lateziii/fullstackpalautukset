import React from 'react'

const Person = ({person, onRemove}) => {
    return (
        <div>
            {person.name}   {person.number} <button onClick={() => onRemove(person)}>delete</button>
        </div>
    )
}
export default Person