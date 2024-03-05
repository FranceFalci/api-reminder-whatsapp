
import { Router } from 'express';
import { getPatiens } from '../controllers/patient.js';

export const patientRouter = Router()


patientRouter.get('/:idUser', getPatiens)

// patientRouter.post('/', createEvent)

// 
// patientRouter.put('/:id', updateEvent)

// patientRouter.delete('/:id', deleteEvent)

