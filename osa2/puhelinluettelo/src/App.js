import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import { setTimeout } from 'timers';

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

const Notification = ({ message }) => {
  if (message[0] === null) {
    return null
  }

  return (
    <div className={message[1]}>
      {message[0]}
    </div>
  )
}


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showName, setShowName ] = useState('')
  const [ message, setMessage] = useState([null, 'notification'])

  useEffect(() => {
    personService.getAll().then(initialPersons => 
    setPersons(initialPersons)
    )
  }, [])


  const addName = (event) => {
    event.preventDefault()
    
    if (persons.filter(person => (person.name === newName)).length > 0) {
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const updatePerson = (persons.filter(person => (person.name === newName)))[0]
        const updateObject = { ...updatePerson, number: newNumber }

        personService
        .update(updatePerson.id, updateObject)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== updatePerson.id ? p : returnedPerson))
        })

        setMessage([`Muokattiin henkilön ${updateObject.name} puhelinnumeroa`, 'notification'])
        setTimeout(() => {setMessage([null, 'notification'])}, 2000)
      } 
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

      setMessage([`Lisättiin henkilö ${nameObject.name} luetteloon`, 'notification'])
      setTimeout(() => {setMessage([null, 'notification'])}, 2000)
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
          .catch(error => {
            setMessage([`Henkilö ${person.name} on jo poistettu luettelosta`, 'error'])
            setTimeout(() => {setMessage([null, 'notification'])}, 2000)
          })

        setPersons(persons.filter(p => p.id !== person.id))
        setMessage([`Poistettiin henkilö ${person.name} luettelosta`, 'error'])
        setTimeout(() => {setMessage([null, 'notification'])}, 2000)
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
      <Notification message={message} />
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