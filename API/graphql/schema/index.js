import { gql } from 'apollo-server-express';
import typeDefs from './schema.js';
import departmentSchema from './department.js';
import doctorSchema from './doctor.js';
import appointmentSchema from './appointment.js';
import userProfileTypeDefs from './userProfileSchema.js';


const baseSchema = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export default [
  baseSchema,
  typeDefs,
  departmentSchema,
  doctorSchema,
  appointmentSchema,
  userProfileTypeDefs

];
