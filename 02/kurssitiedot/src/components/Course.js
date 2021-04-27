import React from 'react'

const Header = (props) => {
    return(
      <div>
        <h2>
         { props.course }
        </h2>
      </div>
    )
  }
  const Content = ({parts}) => {
    return(
      <div>
      <table>
        {parts.map(part => <Part key={part.id} part={part}/>)}
      </table>
      </div>
    )
  }
  const Total = ({parts}) => {
    const total = parts.reduce((summa, part) => summa + part.exercises, 0)
    return(
      <div>
        <h3>total of exercises {total}</h3>
      </div>
    )
  }
  const Part = ({part}) =>{
    return(
      <div>
        <tr>
            <td>{part.name}</td><td>{part.exercises}</td>
        </tr>
      </div>
    )
  }
  const Course = ({course}) => {
    return(
      <div>
        <Header course={course.name}></Header>
        <Content parts={course.parts}></Content>
        <Total parts={course.parts}></Total>
      </div>
    )
  }

export default Course;