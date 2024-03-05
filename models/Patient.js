import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  }
});


const Patient = mongoose.model('Patient', PatientSchema)

export default Patient
