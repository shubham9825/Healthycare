import { gql } from 'apollo-server-express';

//GraphQL schema language
const typeDefs = gql`

type Query {
  hello: String
}

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;

export default typeDefs;
