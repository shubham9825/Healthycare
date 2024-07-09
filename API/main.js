import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import baseSchema from './graphql/schema/index.js';
import resolvers from './graphql/resolvers/resolver.js';
import connectDB from './Database/db.js';
import User from './models/User.js';


import dotenv from 'dotenv';
dotenv.config({ path: './env.env' })
const app = express();

//Middelware to parse the Json bodies.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Mocked user for testing purposes
const mockUser = {
  _id: '6660ab59c2c20818b93de7a4',
  username: 'Milap',
  email: 'Milap@gmail.com',
};

const context = ({ req }) => {
  // Mocked user for testing purposes
  const user = mockUser;

  return { user };
};

connectDB();


//Apollo Server
const server = new ApolloServer({
  typeDefs: baseSchema,
  resolvers,
  context,
});

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

const PORT = process.env.API_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Api Server is Running On ${PORT}`);
  startApolloServer();
});

