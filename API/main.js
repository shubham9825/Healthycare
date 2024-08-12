import express from "express";
import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import querystring from "querystring";
import axios from "axios";
import dotenv from "dotenv";
import connectDB from "./Database/db.js";
import baseSchema from "./graphql/schema/index.js";
import resolvers from "./graphql/resolvers/resolver.js";
import jwt from "jsonwebtoken";

dotenv.config({ path: "./env.env" });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const ZOOM_CLIENT_ID = "tHhHGKZQaq0l4uShKzjCA";
const ZOOM_CLIENT_SECRET = "Q9QxjLN1jmMEC12pIWQG9JO7ESPPEY6k";

app.use(
  cors({
    origin: "*",
    methods: "GET,POST",
    credentials: true,
  })
);

app.use(
  session({
    secret: "EXFXu7VYT-mA6NuGh68jGA",
    resave: false,
    saveUninitialized: true,
  })
);

// JWT authentication middleware
const authenticateToken = (req, res, next) => {
  const { query } = req.body;
  const exclude = ["mutation Login", "mutation Signup"];

  // Check if the operation is a mutation and specifically a login or signup mutation
  const shouldExclude = exclude.some((operation) => query.includes(operation));

  if (query && shouldExclude) {
    // Skip authentication for login or signup mutations
    return next();
  }
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user; // Attach the user to the request
    next();
  });
};

// Apply JWT middleware
app.use("/graphql", authenticateToken);

connectDB();

app.get("/oauth/authorize", (req, res) => {
  const redirectUri =
    process.env.NODE_ENV === "production"
      ? "https://healthycare.onrender.com/callback"
      : "http://localhost:8000/callback";
  const authorizationUrl = `https://zoom.us/oauth/authorize?client_id=${ZOOM_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}`;

  res.redirect(authorizationUrl);
});

app.get("/callback", async (req, res) => {
  const authorizationCode = req.query.code;

  if (!authorizationCode) {
    console.error("No authorization code found");
    return res.status(400).send("Authorization code is missing");
  }

  try {
    const redirectUri =
      process.env.NODE_ENV === "production"
        ? "https://healthycare.onrender.com/callback"
        : "http://localhost:8000/callback";
    const response = await axios.post(
      "https://zoom.us/oauth/token",
      querystring.stringify({
        grant_type: "authorization_code",
        code: authorizationCode,
        redirect_uri: redirectUri,
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

    res.redirect(
      process.env.NODE_ENV === "production"
        ? "https://tranquil-sherbet-cdcd10.netlify.app/#/Appointment"
        : "http://localhost:3000/#/Appointment"
    );
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
  context: ({ req }) => {
    return { req };
  },
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
