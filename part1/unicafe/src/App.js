import React, { useState } from 'react'

const Button = ({handle, text}) => {
  return (
    <button onClick={handle}>{text}</button>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {

  const sum = props.good + props.neutral + props.bad

  if (sum === 0) {
    return (<p>No feedback given</p>)
  }
  
  const average = (props.good - props.bad) / sum;
  const positive = (props.good / sum) * 100 + '%';

  return (
    <div>
      <Statistic text='good' value={props.good}/>
      <Statistic text='neutral' value={props.neutral}/>
      <Statistic text='bad' value={props.bad}/>
      <Statistic text='all' value={sum}/>
      <Statistic text='average' value={average}/>
      <Statistic text='positive' value={positive}/>
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handle={() => setGood(good + 1)} text='good'/>
      <Button handle={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button handle={() => setBad(bad + 1)} text='bad'/>

      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App