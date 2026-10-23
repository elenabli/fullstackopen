// Diagnosis type for /api/diagnoses
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string; // optional
}

interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  description: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// Patient type for /api/patients
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

// Type for returning patients WITHOUT ssn
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

// Gender enum
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

// New patient type for adding patients
export type NewPatient = Omit<Patient, 'id'>;

// Utility type to omit 'id' from union types
export type UnionOmit<T, K extends string | number | symbol> =
  T extends unknown ? Omit<T, K> : never;

// Entry type without id for adding new entries
export type EntryWithoutId = UnionOmit<Entry, 'id'>;