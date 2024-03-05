import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/event.js';

import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';

export const eventRouter = Router()

eventRouter.use(verifyToken)

eventRouter.get('/:idUser' , getEvents) 

eventRouter.post('/',  createEvent)

eventRouter.put('/:id',updateEvent)

eventRouter.delete('/:id', deleteEvent)

