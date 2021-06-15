import React from 'react';
import Part from './Part';
import { CoursePart, PartsProps, ContentProps } from'../types'

const Content: React.FC<ContentProps> = ({courseParts}) => {
    return(
      <div>
        {courseParts.map((part, key) => 
            <Part key={key} part={part}></Part>)}
      </div>
    )
  }
  
export default Content