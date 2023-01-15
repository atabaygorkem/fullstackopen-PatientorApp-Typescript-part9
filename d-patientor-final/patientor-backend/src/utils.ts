import {
  Diagnosis,
  Entry,
  EntryWithoutId,
  Gender,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  NewPatientEntry,
  OccupationalHealthcareEntry,
  UnionOmit,
} from "./types";

type Fields = {
  name: unknown;
  occupation: unknown;
  gender: unknown;
  ssn?: unknown;
  dateOfBirth?: unknown;
  entries: unknown;
};

const toNewPatientEntry = ({
  name,
  occupation,
  gender,
  ssn,
  dateOfBirth,
  entries,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender),
    ssn: parseSsn(ssn),
    dateOfBirth: parseDate(dateOfBirth),
    entries: parseEntries(entries),
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

const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries) || !isEntry(entries[0] ? entries[0] : 1)) {
    throw new Error("Incorrect Entry");
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return entries;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (entry: any): entry is Entry => {
  if (entry === 1) return true;
  if (entry) {
    return true;
  }
  return false;
};

////////////////////////////***Validate patient's entry***///////////////////////////////////////

export const toNewDiagnoseEntryOfPatient = (
  entryObj: EntryWithoutId
): EntryWithoutId => {
  switch (entryObj.type) {
    case "Hospital":
      const hospitalEntry: UnionOmit<HospitalEntry, "id"> = {
        description: parseDescription(entryObj.description),
        date: parseRequiredDate(entryObj.date, parseDate),
        specialist: parseSpecialist(entryObj.specialist),
        diagnosisCodes: parseDiagnosisCodes(entryObj.diagnosisCodes),

        type: entryObj.type,
        discharge: parseDischarge(entryObj.discharge),
      };
      return hospitalEntry;

    case "HealthCheck":
      const healthCheckEntry: UnionOmit<HealthCheckEntry, "id"> = {
        description: parseDescription(entryObj.description),
        date: parseRequiredDate(entryObj.date, parseDate),
        specialist: parseSpecialist(entryObj.specialist),
        diagnosisCodes: parseDiagnosisCodes(entryObj.diagnosisCodes),

        type: entryObj.type,
        healthCheckRating: parseHealthCheckRating(entryObj.healthCheckRating),
      };
      return healthCheckEntry;

    case "OccupationalHealthcare":
      const occupationalHealthcareEntry: UnionOmit<
        OccupationalHealthcareEntry,
        "id"
      > = {
        description: parseDescription(entryObj.description),
        date: parseRequiredDate(entryObj.date, parseDate),
        specialist: parseSpecialist(entryObj.specialist),
        diagnosisCodes: parseDiagnosisCodes(entryObj.diagnosisCodes),

        type: entryObj.type,
        employerName: parseEmployerName(entryObj.employerName),
        sickLeave: parseSickLeave(entryObj.sickLeave),
      };

      return occupationalHealthcareEntry;

    default:
      return assertNever(entryObj);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default toNewPatientEntry;

function parseDescription(description: unknown): string {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
}

function parseRequiredDate(
  date: unknown,
  callback: (date: unknown) => string | undefined
): string {
  const returnedDate: string | undefined = callback(date);
  if (!returnedDate) {
    throw new Error("Missing date");
  }
  return returnedDate;
}

function parseSpecialist(specialist: unknown): string {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
}

function parseDiagnosisCodes(
  diagnosisCodes: string[] | undefined
): Array<Diagnosis["code"]> | undefined {
  if (!diagnosisCodes) return undefined;
  if (
    !Array.isArray(diagnosisCodes) ||
    !(diagnosisCodes.length ? isString(diagnosisCodes[0]) : 1)
  ) {
    throw new Error("Incorrect diagnosis code");
  }

  return diagnosisCodes;
}

function parseDischarge(discharge: { date: unknown; criteria: unknown }): {
  date: string;
  criteria: string;
} {
  const tempDate = discharge.date;
  const tempCriteria = discharge.criteria;
  if (!isString(tempDate) || !isString(tempCriteria)) {
    throw new Error("Incorrect or missing discharge");
  }

  return { date: tempDate, criteria: tempCriteria };
}

function parseHealthCheckRating(healthCheckRating: unknown): HealthCheckRating {
  if (
    healthCheckRating === undefined ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error("Incorrect or missing healthCheckRating");
  }
  return healthCheckRating;
}

function isHealthCheckRating(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  healthCheckRating: any
): healthCheckRating is HealthCheckRating {
  return Object.values(HealthCheckRating).includes(+healthCheckRating);
}

function parseEmployerName(employerName: unknown): string {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employer name");
  }
  return employerName;
}

function parseSickLeave(
  sickLeave: { startDate: unknown; endDate: unknown } | undefined
): { startDate: string; endDate: string } | undefined {
  if (!sickLeave) return undefined;
  const tempStartDate = sickLeave.startDate;
  const tempEndDate = sickLeave.endDate;
  if (!isString(tempStartDate) || !isString(tempEndDate)) {
    throw new Error("Incorrect sickleave");
  }

  return { startDate: tempStartDate, endDate: tempEndDate };
}
