import mongoose, { Schema } from 'mongoose';

const EventSchema = new Schema({

  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  patient:{
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

});

EventSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});



const Event = mongoose.model('Event', EventSchema)

export default Event