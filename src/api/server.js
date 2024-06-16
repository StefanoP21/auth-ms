const express = require('express');
const cors = require('cors');
const path = require('path');
const { envs } = require('../config/envs');

//* Express Server
const server = express();

//* Port
server.set('port', envs.PORT);

//* Middlewares
server.use(cors());
server.use(express.json());

//* Public Directory
server.use(express.static(path.join(__dirname, '../public')));

//* Routes
server.use('/api/auth', require('../routes/auth.router'));

//* Server
const startServer = () => {
  server.listen(server.get('port'), () => {
    console.log(`Server running at http://localhost:${server.get('port')} 🚀`);
  });
};

module.exports = {
  startServer,
};
