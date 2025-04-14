import { Schema, model, Document } from "mongoose";

interface IContent extends Document {
  title: string;
  body: string;
  topic: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema = new Schema<IContent>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    topic: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Content = model<IContent>("Content", ContentSchema);

export default Content;
