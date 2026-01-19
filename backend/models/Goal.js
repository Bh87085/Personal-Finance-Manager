import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  targetAmount: Number,
  savedAmount: { type: Number, default: 0 },
  type: { type: String, enum: ["short", "long"] }
});

export default mongoose.model("Goal", goalSchema);
