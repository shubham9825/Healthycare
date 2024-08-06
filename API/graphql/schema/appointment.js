import { gql } from 'apollo-server-express';

const appointmentSchema = gql`
  type Appointment {
    id: ID!
    user: User!
    doctor: Doctor!
    date: String!
    time: String!
    zoomMeeting: ZoomMeeting 
  }

  type ZoomMeeting {
    join_url: String!
    start_time: String!
  }

  input AppointmentInput {
    department: String!
    doctor: String!
    date: String!
    userId: ID!
    doctorId: ID!
  }

  extend type Query {
    getAppointments(userId: ID!): [Appointment!]!
  }
  
  extend type Mutation {
    createAppointment(input: AppointmentInput!): Appointment!
  }
`;

export default appointmentSchema;
