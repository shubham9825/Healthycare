import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import typeDefs from './graphql/schema/schema.js';
import resolvers from './graphql/resolvers/resolver.js';
import connectDB from './Database/db.js';
import initDB from './Database/initdb.js';
import dotenv from 'dotenv';
dotenv.config({ path: './env.env' })
const app = express();

//Middelware to parse the Json bodies.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


connectDB();
initDB();
//Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
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

