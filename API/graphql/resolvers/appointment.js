import Appointment from '../../models/Appointment.js';
import Department from '../../models/Department.js';
import Doctor from '../../models/Doctor.js';
import mongoose from 'mongoose';

const appointmentResolvers = {
  Query: {
    getAppointments: async (_, { userId }, { user }) => {
      try {
        if (!user) {
          throw new Error('User Not Authenticated');
        }
        const appointments = await Appointment.find({ user: userId });
        return appointments;
      } catch (error) {
        console.error('Error fetching appointments:', error);
        throw new Error('Error fetching appointments');
      }
    }
  },
  Mutation: {
    createAppointment: async (_, { input }) => {
      try {
        const { department, doctor, date, userId, doctorId } = input;

        // Validate department and doctor names
        const departmentExists = await Department.exists({ name: department });
        if (!departmentExists) {
          throw new Error('Department not found');
        }

        const doctorExists = await Doctor.exists({ name: doctor });
        if (!doctorExists) {
          throw new Error('Doctor not found');
        }

        // Extract date and time from the input date string
        const dateObject = new Date(date);
        const dateString = dateObject.toISOString().split('T')[0]; // YYYY-MM-DD
        const timeString = dateObject.toISOString().split('T')[1].split('.')[0]; // HH:MM:SS

        // Create a new appointment record
        const appointment = new Appointment({
          user: new mongoose.Types.ObjectId(userId),
          doctor:new  mongoose.Types.ObjectId(doctorId),
          date: dateString,
          time: timeString,
        });
        await appointment.save();

        // Fetch the full appointment details including user and doctor information
        const populatedAppointment = await Appointment.findById(appointment._id)
          .populate('user')
          .populate('doctor')
          .exec();

        return {
          ...populatedAppointment._doc,
          id: populatedAppointment._id.toString(),
          user: {
            ...populatedAppointment.user._doc,
            id: populatedAppointment.user._id.toString(),
          },
          doctor: {
            ...populatedAppointment.doctor._doc,
            id: populatedAppointment.doctor._id.toString(),
          },
        };
      } catch (error) {
        console.error('Error creating appointment:', error);
        throw new Error('Error creating appointment');
      }
    },
  },
};

export default appointmentResolvers;
