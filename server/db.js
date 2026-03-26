const mongoose = require('mongoose');

async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is missing. Add it in your .env file.');
  }

  mongoose.set('strictQuery', true);

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
  });

  return mongoose.connection;
}

module.exports = {
  connectDatabase,
};
