import { Schema, model, Document } from "mongoose";
import type { ITopic } from "./topic";

export interface IModule extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  description?: string;
  course: Schema.Types.ObjectId;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  topics?: ITopic[];
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

ModuleSchema.virtual("topics", {
  ref: "Topic",
  localField: "_id",
  foreignField: "module",
  justOne: false,
});

const Module = model<IModule>("Module", ModuleSchema);

export default Module;
