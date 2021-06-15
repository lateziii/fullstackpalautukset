import React from 'react'
import {PartsProps} from '../types'

const Part: React.FC<PartsProps> = ({part})  => {
    console.log(typeof part)
    switch(part.type) {
        case "normal":
            return <div><b>{part.name} {part.exerciseCount}</b><br/>
            <i>{part.description}</i><br/><br/></div>;
        case "groupProject":
            return <div><b>{part.name} {part.exerciseCount}</b><br/>
            project exercises {part.groupProjectCount}<br/><br/></div>;
        case "submission":
            return <div><b>{part.name} {part.exerciseCount}</b><br/>
            <i>{part.description}</i><br/>
            submit to {part.exerciseSubmissionLink}<br/><br/></div>;
        case "special":
            return <div><b>{part.name} {part.exerciseCount}</b><br/>
            {part.description}<br/>
            required skills {part.requirements.map(r => 
            r + ', ')}</div>;
    }
    return (
        <div>
          <p>
            error
          </p>
        </div>);
    
} 
export default Part