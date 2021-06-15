export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}
interface BasicEntry {
    id: string;
    date: string;
    specialist: string;
    description: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}
interface HospitalEntry extends BasicEntry {
    type: 'Hospital';
    discharge: {
        date: string;
        criteria: string;
    };
    criteria?: string;
}
interface OccupationalHealthCareEntry extends BasicEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    }
}
interface HealthCheck extends BasicEntry {
    type: 'HealthCheck';
    healthCheckRating: 0 | 1 | 2 | 3;
  }
export type Entry = 
    HospitalEntry | OccupationalHealthCareEntry | HealthCheck;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}
export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]
}
export interface PatientNoSsn {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]
}
export type NewPatientEntry = Omit<Patient, 'id'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;
