import { gql } from 'apollo-server-express';

const departmentSchema = gql`
  type Department {
    id: ID!
    name: String!
  }

  extend type Query {
    departments: [Department!]!
    department(id: ID!): Department
  }
`;

export default departmentSchema;
