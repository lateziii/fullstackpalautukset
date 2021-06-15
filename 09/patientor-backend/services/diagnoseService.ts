import diagnoseEntries from '../data/diagnoses';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnoseEntries;

const getEntries = (): Array<Diagnose> => {
    return diagnoses;
};
const addEntry = () => {
    return null;
};
  
export default {
getEntries,
addEntry
};
  