import patientEntries from '../data/patients';
import { PatientNoSsn, NewPatientEntry, Patient, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<PatientNoSsn> = patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
    })
  );
  const patientsWithSsn: Array<Patient> = patientEntries.map(
    ({ id, name, dateOfBirth, ssn, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
      entries
    })
  );

const getEntries = (): Array<PatientNoSsn> => {
    return patients;
};
const getOne = (id: string): Patient | undefined => {
  return patientsWithSsn.find(p => p.id === id);
};
const addPatient = (entry: NewPatientEntry): Patient => {
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
const addEntry = (id: string, entry: Entry): Entry => {
  const patient: Patient | undefined = getOne(id);
  if(patient) {
    patient.entries.push(entry);
  } else {
    throw new Error('Wrong id!');
  }
  return entry;
};
  
export default {
getEntries,
addPatient,
getOne,
addEntry
};
  