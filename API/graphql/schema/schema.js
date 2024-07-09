import { gql } from 'apollo-server-express';

const typeDefs = gql`
type Query {
  hello: String
}

  type User {
    id: ID!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    signup(email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;
export default typeDefs;
