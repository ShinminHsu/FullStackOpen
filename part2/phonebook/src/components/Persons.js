import React from 'react'

const Persons = (props) => {
    return (
        <ul>
        {props.filterWord === ""
            ? props.persons.map(person => 
            <li key={person.name}>{person.name} {person.number}</li>)  
            : props.filterPersons.map(person => 
            <li key={person.name}>{person.name} {person.number}</li>)
            }
        </ul>
    )
}

export default Persons