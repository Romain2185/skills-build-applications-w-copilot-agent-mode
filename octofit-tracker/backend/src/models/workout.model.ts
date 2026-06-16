import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  category: string;
  durationMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  caloriesBurned: number;
  description: string;
}

const WorkoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  caloriesBurned: { type: Number, required: true },
  description: { type: String, required: true },
});

const Workout = mongoose.models.Workout || mongoose.model<IWorkout>('Workout', WorkoutSchema);
export default Workout;
