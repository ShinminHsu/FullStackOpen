import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterWord, setfilterWord ] = useState('')
  const [ filterPersons, setfilterPersons ] = useState(persons)

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => {
    setfilterWord(event.target.value)
    setfilterPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber
    }

    const checkExist = persons.filter(person => person.name === newName)

    // check if the submitted name is already added
    if (checkExist.length > 0) {
      alert(`${newName} is already added to phonebook`)
      console.log('Already in the list')
    } else {
      setPersons(persons.concat(newObject))
      setNewName('')
      setNewNumber('')
      console.log('New name added', newObject)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterWord={filterWord} handleFilterChange={handleFilterChange}/>

      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons filterWord={filterWord} persons={persons} filterPersons={filterPersons}/>
    </div>
  )
}

export default App