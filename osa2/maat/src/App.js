import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({countries, showCountries, setShowCountries}) => {
  let showed = countries.filter(country => 
    country.name.toUpperCase().includes(showCountries.toUpperCase()))

  const handleClick = (event) => (
    setShowCountries(event.target.value)
  )

  if (showed.length > 10) {

    return (<div>Too many matches, specify another filter</div>)

  } else if (showed.length === 1) {

    const country = showed[0]
    return (<Country country={country} />)

  } else {

    return (
      showed.map(country => 
        <div key={country.name}>
          {country.name}
          <button value={country.name} onClick={handleClick}>Show</button>
        </div> )
    )
  }
}

const Country = ({country}) => {
  const languages = country.languages.map(language => <li key={language.name}>{language.name}</li>)
  
  return (
    <>
      <h1>{country.name}</h1>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h2>Languages</h2>
      <ul>
        {languages}
      </ul>
      <img src={country.flag} alt={country.name} width="300" heigth="200" />
    </>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ showCountries, setShowCountries ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
      setCountries([].slice.call(response.data))
    })
  }, [])


  const handleShowCountriesChange = (event) => {
    setShowCountries(event.target.value)
  }


  return (
    <div>
      <p>
        Find countries: 
        <input value={showCountries} onChange={handleShowCountriesChange} />  
      </p>
      <Countries countries={countries} showCountries={showCountries} setShowCountries={setShowCountries}/>
    </div>
  )
}

export default App;
