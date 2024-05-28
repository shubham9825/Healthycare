const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const path = require('path');

const apiProxyTarget = 'http://localhost:8000/graphql';
require('dotenv').config({ path: 'env.env' });

// create api proxy
if (apiProxyTarget) {
  app.use('/graphql', createProxyMiddleware({ target: apiProxyTarget, changeOrigin: false }));
}

app.use(express.static(path.resolve(__dirname, 'public')));

const appPort = process.env.UI_PORT;

// listen the app on specific port
app.listen(appPort, () => {
  console.log(`App started on port ${appPort}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});
