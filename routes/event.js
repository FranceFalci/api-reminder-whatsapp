import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/event.js';

import { Router } from 'express';
// import { validarJWT                            } from '../middlewares/validarJWT';
// import { check } from 'express-validator';
// import { validarCampos } from '../middlewares/validarCampos';
// import { isDate } from '../helpers/isDate';

export const eventRouter = Router()

// router.use(validarJWT)

eventRouter.get('/:idUser' , getEvents) 

eventRouter.post('/',  createEvent)

eventRouter.put('/:id',updateEvent)

eventRouter.delete('/:id', deleteEvent)

