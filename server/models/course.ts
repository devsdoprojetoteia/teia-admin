import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

interface ICourse extends Document {
  name: string;
  description?: string;
  phone: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    name: { type: String, required: true },
    description: { type: String },
    phone: { type: String, required: true, unique: true },
    published: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);
const Course = model<ICourse>("Course", CourseSchema);

export default Course;
