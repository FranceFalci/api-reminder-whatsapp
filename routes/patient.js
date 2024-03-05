
import { Router } from 'express';
import { createPatient, deletePatient, getPatiens, updatePatient } from '../controllers/patient.js';
import { verifyToken } from '../middlewares/verifyToken.js';

export const patientRouter = Router()

patientRouter.use(verifyToken)

patientRouter.get('/', getPatiens)

patientRouter.post('/', createPatient)

patientRouter.put('/:id', updatePatient)

patientRouter.delete('/:id', deletePatient)

