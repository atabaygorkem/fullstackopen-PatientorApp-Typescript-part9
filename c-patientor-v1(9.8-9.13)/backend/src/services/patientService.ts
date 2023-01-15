import { NewPatientEntry, NonSensitivePatientEntry, Patient } from "../types";
import patientEntries from "../../data/patientEntries";
import { v4 as uuid } from "uuid";

const getPatients = (): Array<Patient> => patientEntries;

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

export default { getPatients, getNonSensitivePatientEntries, addPatient };
