import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

mongoose.set('strictQuery', true);

/**
 * Seed the octofit_db database with test data and connect using Mongoose.
 */
export async function connectDatabase() {
  return mongoose.connect(mongoUri);
}

export { mongoose, mongoUri };
