import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({person, handleDeletePerson}) => {

  return (
      <div key={person.id}>
        {person.name} {person.number} 
        <button onClick={() => handleDeletePerson()}>Poista</button>
      </div>
  )
}

const PersonForm = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => (
  <form onSubmit={addName}>
    <div>Nimi: <input value={newName} onChange={handleNameChange}/></div>
    <div>Numero: <input value={newNumber} onChange={handleNumberChange}/></div>
    <div>
      <button type="submit">lisää</button>
    </div>
  </form>
)

const Filter = ({showName, handleShowNameChange}) => (
  <div>
    Rajaa näytettäviä:  
    <input value={showName} onChange={handleShowNameChange} />
  </div>
)


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showName, setShowName ] = useState('')

  useEffect(() => {
    personService.getAll().then(initialPersons => 
    setPersons(initialPersons)
    )
  }, [])


  const addName = (event) => {
    event.preventDefault()
    
    if (persons.filter(person => (person.name === newName)).length > 0) {
      window.alert(`${newName} on jo luettelossa`)
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })

    }
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleShowNameChange = (event) => {
    setShowName(event.target.value)
  }

  const handleDeletePerson = id => {
      const person = persons.find(p => p.id === id)

      if (window.confirm(`Haluatko varmasti poistaa ${person.name}?`)) {
        personService
          .deletePerson(id)
          .then()
          
        setPersons(persons.filter(p => p.id !== person.id))
      }

  }

  const rows = () => {
    const showed = persons.filter(person => person.name.toUpperCase().includes(showName.toUpperCase()))

    return (
      showed.map(person => <Person key={person.id} person={person} 
        handleDeletePerson={() => handleDeletePerson(person.id)}/>)
    )
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter showName={showName} handleShowNameChange={handleShowNameChange}/>
      <h3>Lisää uusi</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numerot</h3>
      {rows()}
    </div>
  )

}

export default App