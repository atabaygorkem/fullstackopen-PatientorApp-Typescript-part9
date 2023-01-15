import {
  EntryWithoutId,
  NewPatientEntry,
  NonSensitivePatientEntry,
  Patient,
} from "../types";
import patientEntries from "../../data/patientEntries";
import { v4 as uuid } from "uuid";

const getPatients = (): Array<Patient> => patientEntries;

const getPatientById = (id: string): Patient | undefined =>
  patientEntries.find((obj) => obj.id === id);

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...entry,
  };

  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

const updatePatient = (
  patient: Patient,
  diagnoseEntry: EntryWithoutId
): Patient => {
  patient.entries.push({ ...diagnoseEntry, id: uuid() });
  const patientIndex = patientEntries.findIndex((obj) => obj.id === patient.id);
  if (patientIndex === -1) throw new Error("User not found");
  patientEntries[patientIndex] = patient;
  return patient;
};

export default {
  getPatients,
  getNonSensitivePatientEntries,
  addPatient,
  getPatientById,
  updatePatient,
};
