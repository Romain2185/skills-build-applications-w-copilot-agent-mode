import mongoose from 'mongoose';
import Activity from '../models/activity.model';
import Leaderboard from '../models/leaderboard.model';
import Team from '../models/team.model';
import User from '../models/user.model';
import Workout from '../models/workout.model';

/**
 * Seed the octofit_db database with test data.
 */
async function seedDatabase() {
  const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB for seed data');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.create([
    { name: 'Ariel Octavia', email: 'ariel@octofit.com', role: 'athlete' },
    { name: 'Marina Swift', email: 'marina@octofit.com', role: 'coach' },
    { name: 'Finn Pulse', email: 'finn@octofit.com', role: 'athlete' },
  ]);

  const teams = await Team.create([
    {
      name: 'Deep Dive Dynamos',
      description: 'A team of endurance athletes training for oceanic adventure runs.',
      members: [users[0]._id, users[2]._id],
      score: 1980,
    },
    {
      name: 'Cardio Kraken',
      description: 'Focused on high-intensity interval training and team challenges.',
      members: [users[1]._id],
      score: 1260,
    },
  ]);

  await Activity.create([
    {
      user: users[0]._id,
      type: 'running',
      durationMinutes: 42,
      distanceKm: 8.5,
      caloriesBurned: 610,
      date: new Date('2026-06-10T08:30:00Z'),
    },
    {
      user: users[2]._id,
      type: 'cycling',
      durationMinutes: 52,
      distanceKm: 21.7,
      caloriesBurned: 710,
      date: new Date('2026-06-11T07:15:00Z'),
    },
    {
      user: users[1]._id,
      type: 'strength',
      durationMinutes: 60,
      caloriesBurned: 540,
      date: new Date('2026-06-11T17:00:00Z'),
    },
  ]);

  await Leaderboard.create([
    { rank: 1, userName: 'Ariel Octavia', score: 1230, teamName: 'Deep Dive Dynamos' },
    { rank: 2, userName: 'Finn Pulse', score: 980, teamName: 'Deep Dive Dynamos' },
    { rank: 3, userName: 'Marina Swift', score: 860, teamName: 'Cardio Kraken' },
  ]);

  await Workout.create([
    {
      title: 'Ocean Core Burn',
      category: 'strength',
      durationMinutes: 35,
      difficulty: 'intermediate',
      caloriesBurned: 320,
      description: 'A guided core and stability workout designed for outdoor athletes.',
    },
    {
      title: 'Sunrise Tempo Run',
      category: 'running',
      durationMinutes: 50,
      difficulty: 'advanced',
      caloriesBurned: 620,
      description: 'A tempo run with varied pacing to improve endurance and speed.',
    },
    {
      title: 'Recovery Flow',
      category: 'mobility',
      durationMinutes: 25,
      difficulty: 'beginner',
      caloriesBurned: 180,
      description: 'Low-impact movement and mobility sequence for active recovery.',
    },
  ]);

  console.log('Database seeding complete. Seed the octofit_db database with test data.');
  await mongoose.disconnect();
}

seedDatabase().catch((error) => {
  console.error('Seed script failed:', error);
  process.exit(1);
});
