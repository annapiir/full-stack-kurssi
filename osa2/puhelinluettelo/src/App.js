import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Persons = ({persons, showName}) => {
  const showed = persons.filter(person => person.name.toUpperCase().includes(showName.toUpperCase()))

  return (
    showed.map(person => <p key={person.name}>{person.name} {person.number}</p>)
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
    console.log('effect')
    axios.get('http://localhost:3001/persons').then(response => {
      console.log('callback')
      setPersons(response.data)
    })
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

      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
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



  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter showName={showName} handleShowNameChange={handleShowNameChange}/>
      <h3>Lisää uusi</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numerot</h3>
      <Persons persons={persons} showName={showName}/>
    </div>
  )

}

export default App