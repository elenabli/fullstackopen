"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.parseDiagnosisCodes = exports.toNewPatient = exports.newPatientSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("./types");
exports.newPatientSchema = zod_1.z.object({
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().date(), // validates ISO date
    ssn: zod_1.z.string(),
    gender: zod_1.z.enum(types_1.Gender),
    occupation: zod_1.z.string(),
    entries: zod_1.z.array(zod_1.z.any()) // entries can be any type for now
});
const toNewPatient = (object) => {
    return exports.newPatientSchema.parse(object);
};
exports.toNewPatient = toNewPatient;
const parseDiagnosisCodes = (object) => {
    if (!object ||
        typeof object !== 'object' ||
        !("diagnosisCodes" in object)) {
        return [];
    }
    return object.diagnosisCodes;
};
exports.parseDiagnosisCodes = parseDiagnosisCodes;
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseString = (text, fieldName) => {
    if (!isString(text)) {
        throw new Error(`Invalid or missing ${fieldName}`);
    }
    return text;
};
const parseDischarge = (discharge) => {
    if (!discharge || typeof discharge !== 'object' || !('date' in discharge) || !('criteria' in discharge)) {
        throw new Error('Invalid or missing discharge');
    }
    const d = discharge;
    return {
        date: parseString(d.date, 'discharge.date'),
        criteria: parseString(d.criteria, 'discharge.criteria')
    };
};
const parseSickLeave = (sickLeave) => {
    if (!sickLeave || typeof sickLeave !== 'object' || !('startDate' in sickLeave) || !('endDate' in sickLeave)) {
        throw new Error('Invalid sickLeave');
    }
    const s = sickLeave;
    return {
        startDate: parseString(s.startDate, 'sickLeave.startDate'),
        endDate: parseString(s.endDate, 'sickLeave.endDate')
    };
};
const toNewEntry = (object) => {
    if (!object || typeof object !== 'object' || !('type' in object)) {
        throw new Error("Missing entry type");
    }
    const obj = object;
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
                diagnosisCodes: (0, exports.parseDiagnosisCodes)(obj),
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
                diagnosisCodes: (0, exports.parseDiagnosisCodes)(obj),
                healthCheckRating: obj.healthCheckRating,
            };
        case "OccupationalHealthcare":
            return {
                type: "OccupationalHealthcare",
                date: parseString(obj.date, 'date'),
                specialist: parseString(obj.specialist, 'specialist'),
                description: parseString(obj.description, 'description'),
                diagnosisCodes: (0, exports.parseDiagnosisCodes)(obj),
                employerName: parseString(obj.employerName, 'employerName'),
                sickLeave: obj.sickLeave ? parseSickLeave(obj.sickLeave) : undefined,
            };
        default:
            throw new Error(`Unknown entry type: ${obj.type}`);
    }
};
exports.toNewEntry = toNewEntry;
exports.default = exports.toNewPatient;
