"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getPatients = () => {
    return patients_1.default;
};
const getNonSensitivePatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (entry) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patients_1.default.push(newPatient);
    return newPatient;
};
const findById = (id) => {
    const patient = patients_1.default.find((p) => p.id === id);
    return patient;
};
const addEntry = (patientId, entry) => {
    const patient = patients_1.default.find(p => p.id === patientId);
    if (!patient)
        throw new Error("Patient not found");
    const newEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patient.entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    findById,
    addEntry
};
