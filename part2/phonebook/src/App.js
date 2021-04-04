import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterWord, setfilterWord ] = useState('')
  const [ filterPersons, setfilterPersons ] = useState(persons)

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