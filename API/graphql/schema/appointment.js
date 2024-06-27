import { gql } from 'apollo-server-express';

const appointmentSchema = gql`
  type Appointment {
    id: ID!
    user: User!
    doctor: Doctor!
    date: String!
    time: String!
  }

  input AppointmentInput {
  userId: ID!
  doctorId: ID!
  date: String!
  time: String!
}

 extend type Query {
    getAppointments(userId: ID!): [Appointment!]!
  }
  
  extend type Mutation {
    createAppointment(input: AppointmentInput!): Appointment!
  }
`;

export default appointmentSchema;
