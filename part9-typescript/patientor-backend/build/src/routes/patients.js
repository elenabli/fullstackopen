"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const zod_1 = require("zod");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.json(patientService_1.default.getNonSensitivePatients());
});
router.post('/', (req, res) => {
    try {
        const newPatient = (0, utils_1.toNewPatient)(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (e) {
        if (e instanceof zod_1.z.ZodError) {
            res.status(400).send({ error: e.issues });
        }
        else {
            res.status(400).send('Something went wrong.');
        }
    }
});
router.get('/:id', (req, res) => {
    const patient = patientService_1.default.findById(req.params.id);
    if (!patient) {
        return res.status(404).send({ error: 'Patient not found' });
    }
    return res.json(patient);
});
router.post('/:id/entries', (req, res) => {
    try {
        const { id } = req.params;
        const newEntry = (0, utils_1.toNewEntry)(req.body);
        const added = patientService_1.default.addEntry(id, newEntry);
        res.json(added);
    }
    catch (e) {
        if (e instanceof zod_1.z.ZodError) {
            res.status(400).send({ error: e.issues });
        }
        else {
            res.status(400).send('Something went wrong.');
        }
    }
});
exports.default = router;
