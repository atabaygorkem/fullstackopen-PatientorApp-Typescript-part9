import { Gender, NewPatientEntry } from "./types";

type Fields = {
  name: unknown;
  occupation: unknown;
  gender: unknown;
  ssn?: unknown;
  dateOfBirth?: unknown;
};

const toNewPatientEntry = ({
  name,
  occupation,
  gender,
  ssn,
  dateOfBirth,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender),
    ssn: parseSsn(ssn),
    dateOfBirth: parseDate(dateOfBirth),
  };

  return newEntry;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseSsn = (ssn: unknown): string | undefined => {
  if (!ssn) return undefined;
  if (!isString(ssn)) {
    throw new Error("Incorrect ssn");
  }
  return ssn;
};

const parseDate = (date: unknown): string | undefined => {
  if (!date) return undefined;

  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export default toNewPatientEntry;
