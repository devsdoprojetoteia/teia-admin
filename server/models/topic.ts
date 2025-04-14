import { Schema, model, Document } from "mongoose";

interface ITopic extends Document {
  name: string;
  description?: string;
  module: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TopicSchema = new Schema<ITopic>(
  {
    name: { type: String, required: true },
    description: { type: String },
    module: { type: Schema.Types.ObjectId, ref: "Module", required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Topic = model<ITopic>("Topic", TopicSchema);

export default Topic;
