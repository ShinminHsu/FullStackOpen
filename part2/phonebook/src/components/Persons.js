import React from 'react'

const Persons = (props) => {

    const data = props.filterWord === "" ? props.persons : props.filterPersons

    return (
        <ul>
        {data.map(person => 
            <li key={person.name}>
                {person.name} {person.number} <button onClick={() => props.handeDeleteClick(person.name, person.id)}>delete</button>
            </li>)}
        </ul>
    )
}

export default Persons