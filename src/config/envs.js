require('dotenv').config();
const env = require('env-var');

const envs = {
  //* Server
  PORT: env.get('PORT').default(3000).asPortNumber(),
  //* MongoDB
  MONGO_URL: env.get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
  //* JWT
  JWT_SECRET: env.get('JWT_SECRET').required().asString(),
};

module.exports = { envs };
