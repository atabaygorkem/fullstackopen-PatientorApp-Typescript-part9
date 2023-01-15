export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export type NewPatientEntry = Omit<Patient, "id">;

export type NonSensitivePatientEntry = Omit<Patient, "ssn">;

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
