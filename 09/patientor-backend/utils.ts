import { NewPatientEntry, Gender } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};
const parseName = (name: any): string => {
    if(!name || !isString(name)) {
        throw new Error('Incorrect or missing name')
    }
    return name;
};
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date' + date);
    }
    return date;
};
const parseSsn= (ssn: any): string => {
    if(!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
}; 
const isGender = (param: any): param is Gender => {
    return param ==='other' || param ==='male' || param === 'female';
};
const parseGender = (gender: any): string => {
    if(!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
}; 
const parseOccupation = (occupation: any): string => {
    if(!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};  

const toNewPatientEntry = (object: any): NewPatientEntry => {
    
    return{
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
    };
};

export default toNewPatientEntry;