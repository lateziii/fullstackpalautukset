export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}
export enum EntryEnum {
  HealthCheck = 'Healthcheck',
  Hospital = "Hospital",
  OccupationalHealthcare = "Occupational Healthcare"
}
interface BasicEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnosis['code']>;

}
interface HospitalEntry extends BasicEntry {
  type: 'Hospital';
  discharge: string[];
}
interface OccupationalHealthCareEntry extends BasicEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave: string[];
}
interface HealthCheck extends BasicEntry {
  type: 'HealthCheck';
  healthCheckRating: 0 | 1 | 2 | 3;
}
export type Entry = 
  HospitalEntry | OccupationalHealthCareEntry | HealthCheck;

export interface EntryForm extends BasicEntry {
  type: string;
  employerName?: string;
  sickLeaveStartDate?: string;
  sickLeaveEndDate?: string;
  healthCheckRating?: 0 | 1 | 2 | 3;
  dischargeDate?: string;
  dischargeCriteria?: string;
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}
