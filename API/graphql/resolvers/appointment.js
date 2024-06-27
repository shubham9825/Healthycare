import Appointment from '../../models/Appointment.js';
import Department from '../../models/Department.js';
import Doctor from '../../models/Doctor.js';
import mongoose from 'mongoose';

const appointmentResolvers = {
  Query: {
    getAppointments: async(_,__,{ user }) =>{
      try {
        if(!user) {
          throw new Error('User Not Authenticated');
        }
        const appointments = await Appointment.find({ user: user.id });
        return appointments;
      } catch (error) {
        console.error('Error fetching appointments:', error);
        throw new Error('Error fetching appointments');
      }
    }
  },
  Mutation: {
    createAppointment: async (_, { input }, { user }) => {
      try {
        if (!user) {
          throw new Error('User not authenticated');
        }
        // Create a new appointment record
        const appointment = new Appointment({
          user: user._id.toString(),
          doctor: input.doctorId,
          date: input.date,
          time: input.time,
        });
        await appointment.save();
        return appointment;
      } catch (error) {
        console.error('Error creating appointment:', error);
        throw new Error('Error creating appointment');
      }
    },
  },
};

export default appointmentResolvers;
