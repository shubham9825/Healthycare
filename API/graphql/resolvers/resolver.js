import userResolvers from './user.js';
import departmentResolvers from './department.js';
import doctorResolvers from './doctor.js';
import appointmentResolvers from './appointment.js';
import userProfileResolver from './userProfileResolver.js';


const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...departmentResolvers.Query,
    ...doctorResolvers.Query,
    ...appointmentResolvers.Query,
    ...userProfileResolver.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...appointmentResolvers.Mutation,
    ...userProfileResolver.Mutation,
  },
  Doctor: {
    ...doctorResolvers.Doctor,
  },
};

export default resolvers;