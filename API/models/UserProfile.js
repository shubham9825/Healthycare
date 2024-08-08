import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true , unique:true},
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  phoneNo: { type: String, required: true },
  emergencyName: { type: String, required: true },
  emergencyPhNo: { type: String, required: true },
  activity: { type: [String], default: [] },
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;
