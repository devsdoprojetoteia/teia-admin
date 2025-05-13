import { Schema, model, Document } from "mongoose";

interface ITopic extends Document {
  title: string;
  content: string;
  module: Schema.Types.ObjectId;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TopicSchema = new Schema<ITopic>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    module: { type: Schema.Types.ObjectId, ref: "Module", required: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Topic = model<ITopic>("Topic", TopicSchema);

export default Topic; 