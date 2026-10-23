import express, { Response } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatient } from '../types';
import {toNewPatient, toNewEntry} from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (e: unknown) {
        if (e instanceof z.ZodError) {
            res.status(400).send({ error: e.issues });
        } else {
            res.status(400).send('Something went wrong.');
        }
    }
});

router.get('/:id', (req, res) => {
    const patient = patientService.findById(req.params.id);
    if (!patient) {
    return res.status(404).send({ error: 'Patient not found' });
  }

  return res.json(patient);
});

router.post('/:id/entries', (req, res) => {
    try {
        const { id } = req.params;
        const newEntry = toNewEntry(req.body);
        const added = patientService.addEntry(id, newEntry);
        res.json(added);
    } catch (e: unknown) {
        if (e instanceof z.ZodError) {
            res.status(400).send({ error: e.issues });
        } else {
            res.status(400).send('Something went wrong.');
        }
    }
});

export default router;