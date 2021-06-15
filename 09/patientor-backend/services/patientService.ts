import patientEntries from '../data/patients';
import { PatientNoSsn, NewPatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<PatientNoSsn> = patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );

const getEntries = (): Array<PatientNoSsn> => {
    return patients;
};
const addEntry = (entry: NewPatientEntry): Patient => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const id: string = uuid();
    const newEntry = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id,
        ...entry
    };
    patients.push(newEntry);
    return newEntry;
};
  
export default {
getEntries,
addEntry
};
  