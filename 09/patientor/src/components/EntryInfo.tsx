import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Entry } from '../types';
import HealthRatingBar from './HealthRatingBar';

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  
  const EntryInfo: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case 'Hospital':
        return <Card.Content>
            <h2>{entry.date} <Icon name='hospital' /></h2>
            <p>{entry.description}</p>
            </Card.Content>;
  
      case 'OccupationalHealthcare':
        return <Card.Content>
            <h2>{entry.date} <Icon name='treatment' /></h2>
        <p>{entry.description}</p>
        </Card.Content>;
      case 'HealthCheck':
        return <Card.Content>
            <h2>{entry.date} <Icon name='user doctor' /></h2>
            <p>{entry.description}</p>
            <HealthRatingBar rating={entry.healthCheckRating} showText={true}></HealthRatingBar>
        </Card.Content>;
      default:
        return assertNever(entry);
    }
  };
  
export default EntryInfo;