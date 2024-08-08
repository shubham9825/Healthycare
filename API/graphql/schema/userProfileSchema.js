import { gql } from 'apollo-server-express';

const userProfileTypeDefs = gql`
  type UserProfile {
    id: ID!
    userId: ID!
    name: String!
    dob: String!
    address: String!
    phoneNo: String!
    emergencyName: String!
    emergencyPhNo: String!
    activity: [String!]!
  }

  input UserProfileInput {
    name: String!
    dob: String!
    address: String!
    phoneNo: String!
    emergencyName: String!
    emergencyPhNo: String!
    activity: [String!]!
  }

  type Query {
    getUserProfile(userId: ID!): UserProfile
  }

  type Mutation {
    createUserProfile(input: UserProfileInput!): UserProfile
    updateUserProfile(userId: ID!, input: UserProfileInput!): UserProfile
  }
`;

export default userProfileTypeDefs;
