import React, { useState, useEffect } from 'react';
 import { useParams } from 'react-router-dom';
 import axios from 'axios';
 import { Container, Card, Icon, Button} from 'semantic-ui-react';

 import { Diagnosis, Entry, Patient } from '../types';
 import { apiBaseUrl } from '../constants';
 import { addEntry, setDiagnosisList, updatePatient, useStateValue } from '../state';
import EntryInfo from './EntryInfo';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import AddEntryModal from "../AddEntryModal";

 const PatientPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const [{ patients, diagnosis }, dispatch] = useStateValue();
    const [patient, setPatient] = useState<Patient | undefined>();
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };
    const submitNewEntry= async (values: EntryFormValues) => {
        try {
          const { data: newEntry } = await axios.post<Entry>(
            `${apiBaseUrl}/patients/${values.id}/entries`,
            values
          );
          dispatch(addEntry(values.id, newEntry));
          closeModal();
        } catch (e) {
          console.error(e.response?.data || 'Unknown Error');
          setError(e.response?.data?.error || 'Unknown error');
        }
    };


   const { id } = useParams<{ id: string }>();

   useEffect(() => {
     const getPatient = async () => {
       try {
         const { data: patient } = await axios.get<Patient>(
           `${apiBaseUrl}/patients/${id}`
         );
         setPatient(patient);
         dispatch(updatePatient(patient));
       } catch (error) {
         console.log(error);
       }
     };
     const getDiagnosisList = async () => {
        try {
          const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
            `${apiBaseUrl}/diagnosis`
          );
          dispatch(setDiagnosisList(diagnosisListFromApi));
        } catch (e) {
          console.error(e);
        }
      };
     if (patients[id] && patients[id].ssn) {
         console.log(patients[id].ssn);
       setPatient(patients[id]);
     } else {
       void getPatient();
       void getDiagnosisList();
     }
   }, [id]);

   let iconName: 'genderless'|'woman'|'man';
   if(patient) {
    switch (patient.gender) {
        case 'other':
          iconName = 'genderless';
          break;
        case 'female':
          iconName = 'woman';
          break;
        case 'male':
        iconName = 'man';
        break;
        default:
          iconName = 'genderless';
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getDiagnosis = (code: string): string => {
        if (diagnosis[code]){
            return diagnosis[code].name;
        }
        return 'not found';
        
    };
      

    return (
        <>
   
            <Container>
              <Card>
                <Card.Header><h1>{patient.name} <Icon name={iconName}/></h1> </Card.Header>
                <Card.Content>
                    ssn: {patient.ssn}
                </Card.Content>
                <Card.Content description={`occupation: ${patient.occupation}`} />
                <Card.Content extra>
                    {patient.gender}
                </Card.Content>
                <Card.Header><h2>entries</h2></Card.Header>
                    {patient.entries.map((entry, i) => 
                    <EntryInfo key={i} entry={entry}/>
                    )}
                    {patient.entries.map((entry) => 
                        entry.diagnosisCodes?.map(code => 
                          <li key={code}> {code} {getDiagnosis(code)}</li>)
                    )}
              </Card>
              <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
            id={patient.id}
          />
          <Button onClick={() => openModal()}>Add New Entry</Button>
            </Container>
        </>
      );
   }
   else {
       return <div>404 not found</div>;
   }
   
 };

 export default PatientPage;