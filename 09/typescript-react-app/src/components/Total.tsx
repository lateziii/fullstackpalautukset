import React from 'react';
import { PartType } from '../types'
interface PartsProps{
    parts: Array<PartType>
}
const Total = (props: PartsProps) =>{
    const total = props.parts.map(part => part.exerciseCount).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return <p>Number of exercises {total}</p>
}
export default Total