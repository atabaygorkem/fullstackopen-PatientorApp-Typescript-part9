import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSE_LIST";
      payload: Diagnosis[];
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
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_PATIENT":
      return {
        ...state,
        currentFullPatient: action.payload,
      };
    case "SET_DIAGNOSE_LIST":
      return {
        ...state,
        diagnoses: action.payload,
      };
    default:
      return state;
  }
};

export const setPatientList = (payload: Patient[]): Action => ({
  type: "SET_PATIENT_LIST",
  payload,
});

export const addPatient = (payload: Patient): Action => ({
  type: "ADD_PATIENT",
  payload,
});

export const setPatient = (payload: Patient): Action => ({
  type: "SET_PATIENT",
  payload,
});

export const setDiagnoseList = (payload: Diagnosis[]): Action => ({
  type: "SET_DIAGNOSE_LIST",
  payload,
});
