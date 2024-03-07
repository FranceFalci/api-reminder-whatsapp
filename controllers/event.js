import { response } from 'express';
import Event from '../models/Event.js';
import Patient from '../models/Patient.js';
import User from '../models/User.js';
import { validateEvent } from '../schemas-zod/EventSchema.js';
import { errorHandler } from '../helpers/errorHandler.js';

export const getEvents = async (req, res = response,next) => {
  const {idUser} = req.params

  const user =  await User.findById(idUser) 
  // console.log(user)
  if (!user) return next(errorHandler('400', 'No existe el usuario'))

  try {
    
    const events = await Event.find({ user: idUser }).populate('patient');
    res.json({ success: true, events });

  } catch (error) {

    return next(errorHandler('500', error.message))

  }
}

export const createEvent = async (req, res = response,next) => {
  const result = validateEvent(req.body)

  if (result.error) return next(errorHandler('400', JSON.parse(result.error.message) ))
  const event = new Event(result.data)

  try {

    event.user = req.uid;

    const newEvent = await event.save();

    res.json({
      ok: true,
      event: newEvent
    })


  } catch (error) {
    console.log(error.message)
    return next(errorHandler('500' , error.message))
  }
}

export const updateEvent = async (req, res = response,next) => {
  const result = validateEvent(req.body)

  if (result.error) return next(errorHandler('400', JSON.parse(result.error.message)))

  const eventId = req.params.id;
  const uid = req.uid;

  try {

    const event = await findById(eventId);

    if (!event) return next(errorHandler('404', 'El evento no existe'))

    if (event.user.toString() !== uid) return next(errorHandler('401','No tienes permiso necesario'))

    const newEvent = {
      ...result.data,
      user: uid
    }

    const updatedEvent = await findByIdAndUpdate(eventId, newEvent, { new: true });

    res.json({
      ok: true,
      event: updatedEvent
    });


  } catch (error) {
    console.log(error);
    return next(errorHandler('500', error.message))
  }

}

export const deleteEvent = async (req, res = response,next) => {

  const eventId = req.params.id;
  const uid = req.uid;

  try {

    const event = await findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id'
      });
    }

    if (event.user.toString() !== uid) return next(errorHandler('401', 'No tienes permiso para eliminar este evento'))


    await findByIdAndDelete(eventId);

    res.json({ ok: true });


  } catch (error) {
    console.log(error);
    return next(errorHandler('500', error.message))
  }

}


