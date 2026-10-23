import {z} from 'zod';
import { NewPatient, Gender, Diagnosis, EntryWithoutId } from './types';

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),   // validates ISO date
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(z.any())  // entries can be any type for now
});

export const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};

export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (
    !object || 
    typeof object !== 'object' ||
    !("diagnosisCodes" in object)
  ) {
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown, fieldName: string): string => {
  if (!isString(text)) {
    throw new Error(`Invalid or missing ${fieldName}`);
  }
  return text;
};

const parseDischarge = (discharge: unknown) => {
  if (!discharge || typeof discharge !== 'object' || !('date' in discharge) || !('criteria' in discharge)) {
    throw new Error('Invalid or missing discharge');
  }
  const d = discharge as { [key: string]: unknown };
  return {
    date: parseString(d.date, 'discharge.date'),
    criteria: parseString(d.criteria, 'discharge.criteria')
  };
};

const parseSickLeave = (sickLeave: unknown) => {
  if (!sickLeave || typeof sickLeave !== 'object' || !('startDate' in sickLeave) || !('endDate' in sickLeave)) {
    throw new Error('Invalid sickLeave');
  }
  const s = sickLeave as { [key: string]: unknown };
  return {
    startDate: parseString(s.startDate, 'sickLeave.startDate'),
    endDate: parseString(s.endDate, 'sickLeave.endDate')
  };
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object' || !('type' in object)) {
    throw new Error("Missing entry type");
  }

  const obj = object as { type: string; [key: string]: unknown };

  switch (obj.type) {
    case "Hospital":
      if (!obj.discharge) {
        throw new Error('Missing discharge for Hospital entry');
      }
      return {
        type: "Hospital",
        date: parseString(obj.date, 'date'),
        specialist: parseString(obj.specialist, 'specialist'),
        description: parseString(obj.description, 'description'),
        diagnosisCodes: parseDiagnosisCodes(obj),
        discharge: parseDischarge(obj.discharge),
      };

    case "HealthCheck":
      if (typeof obj.healthCheckRating !== 'number' || obj.healthCheckRating < 0 || obj.healthCheckRating > 3) {
        throw new Error("Invalid health check rating");
      }
      return {
        type: "HealthCheck",
        date: parseString(obj.date, 'date'),
        specialist: parseString(obj.specialist, 'specialist'),
        description: parseString(obj.description, 'description'),
        diagnosisCodes: parseDiagnosisCodes(obj),
        healthCheckRating: obj.healthCheckRating,
      };

    case "OccupationalHealthcare":
      return {
        type: "OccupationalHealthcare",
        date: parseString(obj.date, 'date'),
        specialist: parseString(obj.specialist, 'specialist'),
        description: parseString(obj.description, 'description'),
        diagnosisCodes: parseDiagnosisCodes(obj),
        employerName: parseString(obj.employerName, 'employerName'),
        sickLeave: obj.sickLeave ? parseSickLeave(obj.sickLeave) : undefined,
      };

    default:
      throw new Error(`Unknown entry type: ${obj.type}`);
  }
};

export default toNewPatient;