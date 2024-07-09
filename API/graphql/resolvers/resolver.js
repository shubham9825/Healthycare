import userResolvers from './user.js';
import departmentResolvers from './department.js';
import doctorResolvers from './doctor.js';
import appointmentResolvers from './appointment.js';


const resolvers = {
  Query: {
    ...departmentResolvers.Query,
    ...doctorResolvers.Query,
    ...appointmentResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...appointmentResolvers.Mutation,
  },
  Doctor: {
    ...doctorResolvers.Doctor,
  },
};

export default resolvers;