const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const path = require("path");

//const apiProxyTarget = "https://healthycare.onrender.com/graphql";
require("dotenv").config({ path: "env.env" });

// create api proxy
// if (apiProxyTarget) {
//   app.use(
//     "/graphql",
//     createProxyMiddleware({
//       target: apiProxyTarget,
//       changeOrigin: true,
//       pathRewrite: {
//         "^/graphql": "/graphql",
//       },
//       logLevel: "debug",
//       secure: true,
//     })
//   );
// }

app.use(express.static(path.resolve(__dirname, "public")));

const appPort = process.env.UI_PORT;

// listen the app on specific port
app.listen(appPort, () => {
  console.log(`App started on port ${appPort}`);
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});
