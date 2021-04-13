import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/person'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterWord, setfilterWord ] = useState('')
  const [ filterPersons, setfilterPersons ] = useState(persons)

  // get data from from server and set phonebook
  useEffect(() => {
    personService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

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
    
    const checkExist = persons.find(person => person.name === newName)

    // check if the submitted name is already added
    if (checkExist) {
      const modifyOld = window.confirm(`${newName} is already in the phonebook, replace the old number with the new one?`)
      const id = checkExist.id
      const changeObject = { ...checkExist, number: newNumber }
      
      if (modifyOld){
        personService
          .update(id, changeObject)
          .then(returnedObject =>{
            setPersons(persons.map(person => person.id !== id ? person: returnedObject))
          })
      }

    } else {
      personService
        .create(newObject)
        .then(returnedObject => {
          setPersons(persons.concat(returnedObject))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handeDeleteClick = (name, id) => {
    if( window.confirm(`Delete ${name}?`) ){
      const filterObjects = persons.filter(person => person.id !== id)

      personService
        .deletePerson(id)
        .then(setPersons(filterObjects))
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
      <Persons filterWord={filterWord} persons={persons} filterPersons={filterPersons} handeDeleteClick={handeDeleteClick}/>
    </div>
  )
}

export default App