import { Schema, model, Document } from "mongoose";

interface IModule extends Document {
  name: string;
  description?: string;
  course: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ModuleSchema = new Schema<IModule>(
  {
    name: { type: String, required: true },
    description: { type: String },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Module = model<IModule>("Module", ModuleSchema);

export default Module;
