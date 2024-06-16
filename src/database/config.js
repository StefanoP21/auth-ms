const mongoose = require('mongoose');

const getConnection = async ({ mongoUrl, dbName }) => {
  try {
    await mongoose.connect(mongoUrl, {
      dbName,
    });

    return true;
  } catch (error) {
    throw new Error('Error to connect to the database');
  }
};

module.exports = {
  getConnection,
};
