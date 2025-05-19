import { Schema, model, Document } from "mongoose";
import Topic from "./topic";

interface IModule extends Document {
  name: string;
  description?: string;
  course: Schema.Types.ObjectId;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ModuleSchema = new Schema<IModule>(
  {
    name: { type: String, required: true },
    description: { type: String },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Module = model<IModule>("Module", ModuleSchema);

export default Module;
