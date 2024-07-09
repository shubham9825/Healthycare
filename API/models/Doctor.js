import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
},{ timestamps: true });

const Doctor = mongoose.model('Doctor', DoctorSchema);

export default Doctor;
