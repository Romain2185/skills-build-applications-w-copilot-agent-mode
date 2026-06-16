import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  members: Types.ObjectId[];
  score: number;
  createdAt: Date;
}

const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  score: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Team = mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);
export default Team;
