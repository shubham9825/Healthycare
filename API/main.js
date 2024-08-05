import express from "express";
import axios from "axios";
import querystring from "querystring";
import cors from "cors";
import session from "express-session";
import nodemailer from "nodemailer";

const app = express();

// Hardcoded Zoom Client ID and Secret
const ZOOM_CLIENT_ID = "tHhHGKZQaq0l4uShKzjCA";
const ZOOM_CLIENT_SECRET = "Q9QxjLN1jmMEC12pIWQG9JO7ESPPEY6k"; // Replace with your actual Client Secret

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from your frontend
    methods: "GET,POST",
    credentials: true,
  })
);
app.use(
  session({
    secret: "EXFXu7VYT-mA6NuGh68jGA", // Change this to a strong secret key
    resave: false,
    saveUninitialized: true,
  })
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: "shubhsheliya211@gmail.com", // Your email
    pass: "sicjlrufunqlnwqm", // Your email password
  },
});

app.get("/oauth/authorize", (req, res) => {
  // Construct the authorization URL
  const authorizationUrl = `https://zoom.us/oauth/authorize?client_id=tHhHGKZQaq0l4uShKzjCA&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fcallback`;

  res.redirect(authorizationUrl);
});

// OAuth Callback Endpoint
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
    req.session.accessToken = accessToken; // Store token in session
    res.redirect("http://localhost:3000"); // Redirect to frontend
  } catch (error) {
    console.error(
      "Error getting access token:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Error getting access token");
  }
});

app.post("/create-meeting", async (req, res) => {
  try {
    // Example: Check if the access token is expired
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (!req.session.accessToken || req.session.tokenExpiry <= currentTime) {
      return res.status(401).send("Access token is expired or missing");
    }

    const accessToken = req.session.accessToken;

    const meetingData = req.body;

    const response = await axios.post(
      "https://zoom.us/v2/users/me/meetings",
      meetingData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
    const meetingDetails = response.data;

    console.log("meetingDetails :>> ", meetingDetails);

    const date = new Date(meetingDetails.start_time);

    // Manually extract and format the date parts
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const formattedDate = `${month} ${day}, ${year}, ${hours}:${minutes}:${seconds} ${timeZone}`;

    const mailOptions = {
      from: "shubhsheliya211@gmail.com",
      to: ["shubhamsheliya9825@gmail.com,milapprajapati707070@gmail.com"], // Add doctor and patient emails here
      subject: "New Zoom Meeting Scheduled",
      text: `
Hello,

A new meeting has been scheduled for your upcoming appointment.

Topic: ${meetingDetails.topic}
Start Time: ${formattedDate}
Join URL: ${meetingDetails.join_url}

Thank you for choosing HealthyCareLife.

Best regards,
HealthyCareLife Team
`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).send("Error sending email");
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json(meetingDetails);
      }
    });
  } catch (error) {
    console.error(
      "Error creating meeting:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Error creating meeting");
  }
});

// Start the server
const PORT = process.env.API_PORT || 8000;
app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});
