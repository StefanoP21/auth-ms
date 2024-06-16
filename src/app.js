const { getConnection } = require('./database/config');
const { envs } = require('./config/envs');
const { startServer } = require('./api/server');

(async () => {
  main();
})();

async function main() {
  await getConnection({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.DB_NAME,
  });

  startServer();
}
