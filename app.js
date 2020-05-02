const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

const Router = require('./application/router/Router');
const router = new Router();
app.use(express.static(_dirname + '/public'));
app.use('/', router);

server.listen(9000, () => console.log('Port is 9000'));