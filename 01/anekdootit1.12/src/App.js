import React, { useState } from 'react'
const Button = ({ handleClick, label }) => {
  return <button onClick={handleClick}>{label}</button>;
};
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
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
  const [voted, setVote] = useState(Array.apply(null, {length: 6}).map(function() {return 0;}))
  const [suosituin, setSuosituin] = useState(0)
  const handleClick = () => {
    setSelected(getRandomInt(6))
  }
  const defSuosituin = () => {
    const max = voted.indexOf(Math.max(...voted))
    setSuosituin(max)
  }
  const handleVote = () => {
    const pisteet = [...voted];
    pisteet[selected] +=1;
    setVote(pisteet);
    defSuosituin();
  }
  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {voted[selected]}</p>
      </div>
      <div>
        <Button handleClick={handleVote} label="vote"></Button>
        <Button handleClick={handleClick} label="next anecdote"></Button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[suosituin]} votes</p>
        <p>has {voted[suosituin]} votes</p>
      </div>
    </div>
    
  )
}

export default App