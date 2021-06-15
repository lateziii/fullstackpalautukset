import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | 
  {
    type: "ADD_ENTRY";
    payload: Entry;
    id: string;
  }
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  |
    {
      type: "UPDATE_PATIENT";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
      case "SET_DIAGNOSIS_LIST":
        return {
          ...state,
          diagnosis: {
            ...action.payload.reduce(
              (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
              {}
            ),
            ...state.diagnosis
          }
        };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "ADD_ENTRY":
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.id]: {
              ...state.patients[action.id],
              entries: [
                ...state.patients[action.id].entries,
                action.payload
              ]
            }
          }
        };
    default:
      return state;
  }
};
export const addEntry = (id: string, newEntry: Entry): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: newEntry,
    id
  };
};
export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientListFromApi
  };
};
export const setNewPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient
  };
};
export const updatePatient = (patient: Patient): Action => {
  return {
    type: 'UPDATE_PATIENT',
    payload: patient
  };
};
export const setDiagnosisList = (diagnosisListFromApi: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: diagnosisListFromApi
  };
};
