import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  rank: number;
  userName: string;
  score: number;
  teamName?: string;
}

const LeaderboardSchema = new Schema<ILeaderboardEntry>({
  rank: { type: Number, required: true },
  userName: { type: String, required: true },
  score: { type: Number, required: true },
  teamName: { type: String },
});

const Leaderboard = mongoose.models.Leaderboard || mongoose.model<ILeaderboardEntry>('Leaderboard', LeaderboardSchema);
export default Leaderboard;
