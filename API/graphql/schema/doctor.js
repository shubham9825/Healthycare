import { gql } from 'apollo-server-express';

const doctorSchema = gql`
  type Doctor {
    id: ID!
    name: String!
    department: Department!
  }

  extend type Query {
    doctors(departmentId: ID!): [Doctor!]!
  }
`;

export default doctorSchema;
