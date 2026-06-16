import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import Activity from './models/activity.model';
import Leaderboard from './models/leaderboard.model';
import Team from './models/team.model';
import User from './models/user.model';
import Workout from './models/workout.model';

const app = express();
const port = 8000;
const isCodespaces = Boolean(process.env.CODESPACE_NAME);
const apiUrl = isCodespaces
  ? `https://${process.env.CODESPACE_NAME}-8000.githubpreview.dev`
  : `http://localhost:${port}`;
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running.', apiUrl });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV || 'development', apiUrl });
});

app.get('/api/config', (_req, res) => {
  res.json({ apiUrl, port, codespaceName: process.env.CODESPACE_NAME ?? null });
});

app.get('/api/users', async (_req, res) => {
  const users = await User.find().lean();
  res.json({ users });
});

app.get('/api/teams', async (_req, res) => {
  const teams = await Team.find().populate('members', 'name email role').lean();
  res.json({ teams });
});

app.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find().populate('user', 'name email').lean();
  res.json({ activities });
});

app.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await Leaderboard.find().sort({ rank: 1 }).lean();
  res.json({ leaderboard });
});

app.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json({ workouts });
});

mongoose.set('strictQuery', true);

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Backend listening on ${apiUrl}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
