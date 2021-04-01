import React, { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const Content = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
      <p>{props.anecdotes[props.id]}</p>
      <p>has {props.points[props.id]} votes</p>
    </div>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

  const newAnecdote = () => {
    const newID = getRandomInt(anecdotes.length)
    setSelected(newID)
  }

  const voteAnecdote = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)

    console.log(newPoints)
  }

  const indexMaxVotes = points.indexOf(Math.max(...points));


  return (
    <div>
      <Content header='Anecdote of the day' anecdotes={anecdotes} points={points} id={selected}/>

      <Button handleClick={voteAnecdote} text='vote'/>
      <Button handleClick={newAnecdote} text='next anecdote'/>

      <Content header='Anecdote with max votes' anecdotes={anecdotes} points={points} id={indexMaxVotes}/>
    </div>
  )
}

export default App