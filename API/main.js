import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import querystring from 'querystring';
import axios from 'axios';
import dotenv from 'dotenv';
import connectDB from './Database/db.js';
import baseSchema from './graphql/schema/index.js';
import resolvers from './graphql/resolvers/resolver.js';

dotenv.config({ path: './env.env' });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const ZOOM_CLIENT_ID = "tHhHGKZQaq0l4uShKzjCA";
const ZOOM_CLIENT_SECRET = "Q9QxjLN1jmMEC12pIWQG9JO7ESPPEY6k";

app.use(cors({
  origin: "*",
  methods: "GET,POST",
  credentials: true,
}));

app.use(
  session({
    secret: "EXFXu7VYT-mA6NuGh68jGA",
    resave: false,
    saveUninitialized: true,
  })
);

connectDB();

app.get("/oauth/authorize", (req, res) => {

  const authorizationUrl = `https://zoom.us/oauth/authorize?client_id=tHhHGKZQaq0l4uShKzjCA&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fcallback`;

  res.redirect(authorizationUrl);
});

app.get("/callback", async (req, res) => {
  const authorizationCode = req.query.code;

  if (!authorizationCode) {
    console.error("No authorization code found");
    return res.status(400).send("Authorization code is missing");
  }

  try {
    const response = await axios.post(
      "https://zoom.us/oauth/token",
      querystring.stringify({
        grant_type: "authorization_code",
        code: authorizationCode,
        redirect_uri: "http://localhost:8000/callback",
      }),
      {
        auth: {
          username: ZOOM_CLIENT_ID,
          password: ZOOM_CLIENT_SECRET,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = response.data.access_token;
    req.session.accessToken = accessToken;
    res.redirect("http://localhost:3000/#/Appointment");
  } catch (error) {
    console.error(
      "Error getting access token:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Error getting access token");
  }
});

const server = new ApolloServer({
  typeDefs: baseSchema,
  resolvers,
  context: ({ req }) => ({ req }),
});
async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

const PORT = process.env.API_PORT || 8000;
app.listen(PORT, () => {
  console.log(`API Server is Running On ${PORT}`);
  startApolloServer();
});
