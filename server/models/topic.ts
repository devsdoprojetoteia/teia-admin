import { Schema, model, Document } from "mongoose";

interface IContentItem {
  type: 'text' | 'image' | 'video' | 'audio' | 'document';
  content: string;
  order: number;
}

export interface IQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface ITopic extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  content: IContentItem[];
  type: 'lesson' | 'questionnaire';
  questions: IQuestion[];
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

const QuestionSchema = new Schema<IQuestion>({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: Number, required: true },
});

const TopicSchema = new Schema<ITopic>(
  {
    title: { type: String, required: true },
    content: [ContentItemSchema],
    type: { type: String, enum: ['lesson', 'questionnaire'], required: true, default: 'lesson' },
    questions: [QuestionSchema],
    module: { type: Schema.Types.ObjectId, ref: "Module", required: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Topic = model<ITopic>("Topic", TopicSchema);

export default Topic; 