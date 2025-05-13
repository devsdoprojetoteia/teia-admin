import { Schema, model, Document } from "mongoose";

interface IContentItem {
  type: 'text' | 'image' | 'video' | 'audio' | 'document';
  content: string;
  order: number;
}

interface ITopic extends Document {
  title: string;
  content: IContentItem[];
  module: Schema.Types.ObjectId;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ContentItemSchema = new Schema<IContentItem>({
  type: { type: String, enum: ['text', 'image', 'video', 'audio', 'document'], required: true },
  content: { type: String, required: true },
  order: { type: Number, default: 0 }
});

const TopicSchema = new Schema<ITopic>(
  {
    title: { type: String, required: true },
    content: [ContentItemSchema],
    module: { type: Schema.Types.ObjectId, ref: "Module", required: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Topic = model<ITopic>("Topic", TopicSchema);

export default Topic; 