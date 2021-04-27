import React, { useState } from 'react'

const StatisticLine = ({ text, value}) => {
  return(<tr key="label"><td>{text}</td><td>{value}</td></tr>)
}
const Statistics = (props) => {
  const kaikki = props.allClicks.length;
  const posit = `${Math.round((props.good / kaikki) * 1000)/10}%`;
  const keskiarvo = (props.good + props.bad *-1)/kaikki;
  if (kaikki === 0) {
    return(
      <div>
        No feedback given
      </div>
    )
  } else {
    return(
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good}></StatisticLine>
            <StatisticLine text="neutral" value={props.neutral}></StatisticLine>
            <StatisticLine text="bad" value={props.bad}></StatisticLine>
            <StatisticLine text="all" value={kaikki}></StatisticLine>
            <StatisticLine text="average" value={keskiarvo}></StatisticLine>
            <StatisticLine text="positive" value={posit}></StatisticLine>
          </tbody>
        </table>
    )
  }

}
const Button = ({ handleClick, label }) => {
  return <button onClick={handleClick}>{label}</button>;
};
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleGoodClick = () => {
    setAll(allClicks.concat('N'))
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setAll(allClicks.concat('N'))
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setAll(allClicks.concat('B'))
    setBad(bad + 1)
  }

  return (
    <div>
      <h1> give feedback</h1>
       <div>
        <Button handleClick={handleGoodClick} label="good"></Button>
        <Button handleClick={handleNeutralClick} label="neutral"></Button>
        <Button handleClick={handleBadClick} label="bad"></Button>
      </div>
      <div>
        <h1>statistics</h1> 
        <Statistics good={good} bad={bad} neutral={neutral} allClicks={allClicks}></Statistics>
        
      </div>
    </div>
  )
}

export default App