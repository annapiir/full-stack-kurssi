import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const FeedbackHeader = () => <><h1>Anna palautetta</h1></>

const StatisticsHeader = () => <><h1>Statistiikkaa</h1></>

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = ({text, number}) => {

    return (
        <tr>
            <td>{text}</td>
            <td>{number}</td>
        </tr>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const sum = good + neutral + bad

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  if(sum===0){
        return(
            <div>
                <FeedbackHeader />
                <Button handleClick={handleGoodClick} text={'Hyvä'} />
                <Button handleClick={handleNeutralClick} text={'Neutraali'} />
                <Button handleClick={handleBadClick} text={'Huono'} />
                <StatisticsHeader />
                <p>Ei yhtään palautetta annettu</p>
            </div>
        )
    } else {
        return(
            <div>
                <FeedbackHeader />
                <Button handleClick={handleGoodClick} text={'Hyvä'} />
                <Button handleClick={handleNeutralClick} text={'Neutraali'} />
                <Button handleClick={handleBadClick} text={'Huono'} />
                <StatisticsHeader />
                <table>
                    <tbody>
                        <Statistics text={'Hyvä'} number={good} />
                        <Statistics text={'Neutraali'} number={neutral} />
                        <Statistics text={'Huono'} number={bad} />
                        <Statistics text={'Yhteensä'} number={sum} />
                        <Statistics text={'Keskiarvo'} number={(good - bad) / sum} />
                        <Statistics text={'Positiivisia'} number={(((good / sum)*100).toString()).concat(' %')} />
                    </tbody>
                </table>
            </div>
        )
    }
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
