import { response } from 'express';
import Patient from '../models/Patient.js';
import { errorHandler } from '../helpers/errorHandler.js';
import { validatePatient } from '../schemas-zod/patientSchema.js';

export const getPatiens = async (req, res = response, next) => {


  try {

    const patients = await Patient.find()
    res.json({ success: true, patients })

  } catch (error) {

    return next(errorHandler('500', error.message))

  }
}

export const createPatient = async (req, res = response, next) => {
  const result = validatePatient(req.body)

  if (result.error) return next(errorHandler('400', JSON.parse(result.error.message)))

  const patient = new Patient(result.data)

  try {

    // patient.user = req.uid;

    const newPatient = await patient.save();

    res.json({
      ok: true,
      event: newPatient
    })


  } catch (error) {
    console.log(error)
    return next(errorHandler('500', error.message))
  }
}

export const updatePatient = async (req, res = response, next) => {
  const result = validatePatient(req.body)

  if (result.error) return next(errorHandler('400', JSON.parse(result.error.message)))

  const patientId = req.params.patientId

  try {

    const patient = await Patient.findById(patientId);

    if (!patient) return next(errorHandler('404', 'El paciente no existe'))

    // if (patient.user.toString() !== uid) return next(errorHandler('401', 'No tienes permiso necesario'))

    const newPatient = {
      ...result.data
    }

    const updatedPatient = await Patient.findByIdAndUpdate(patientId, newPatient, { new: true });

    res.json({
      ok: true,
      event: updatedPatient
    });


  } catch (error) {
    console.log(error);
    return next(errorHandler('500', error.message))
  }

}

export const deletePatient = async (req, res = response, next) => {

  const patientId = req.params.id;
  // const uid = req.uid;

  try {

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        ok: false,
        msg: 'El paciente no existe'
      });
    }

    // if (patient.user.toString() !== uid) return next(errorHandler('401', 'No tienes permiso para eliminar este evento'))


    await findByIdAndDelete(patientId);

    res.json({ ok: true });


  } catch (error) {
    console.log(error);
    return next(errorHandler('500', error.message))
  }

}


