import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState(
    [{ name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }]
  ) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showName, setShowName ] = useState('')


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

  const rows = () => {
    const showed = persons.filter(person => person.name.toUpperCase().includes(showName.toUpperCase()))

    return (
      showed.map(person => <p key={person.name}>{person.name} {person.number}</p>)
    )
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <div>
        Rajaa näytettäviä:  
        <input value={showName} onChange={handleShowNameChange} />
      </div>
      <h3>Lisää uusi</h3>
      <form onSubmit={addName}>
        <div>Nimi: <input value={newName} onChange={handleNameChange}/></div>
        <div>Numero: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h3>Numerot</h3>
      {rows()}
    </div>
  )

}

export default App