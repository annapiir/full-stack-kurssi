import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const FeedbackHeader = () => <><h1>Anna palautetta</h1></>

const StatisticsHeader = () => <><h1>Statistiikkaa</h1></>

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = ({good, neutral, bad}) => {
    const sum = good + neutral + bad
    return (
    <>
        <p>Hyvä {good}</p>
        <p>Neutraali {neutral}</p>
        <p>Huono {bad}</p>
        <p>Yhteensä {sum}</p>
        <p>Keskiarvo {(good - bad) / sum}</p>
        <p>Positiivisia {(good / sum) * 100 } %</p>
    </>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <FeedbackHeader />
      <Button handleClick={handleGoodClick} text={'Hyvä'} />
      <Button handleClick={handleNeutralClick} text={'Neutraali'} />
      <Button handleClick={handleBadClick} text={'Huono'} />
      <StatisticsHeader />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
