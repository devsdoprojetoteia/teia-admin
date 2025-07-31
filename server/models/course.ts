import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import type { IModule } from "./module";
import type { IUserCourseProgress } from "./user_course_progress";

interface ICourse extends Document {
  name: string;
  description?: string;
  phone: string;
  published: boolean;
  duration: string;
  learning: string[];
  requirements: string[];
  team: {
    name: string;
    role: string;
    linkedin: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
  modules?: IModule[];
  userCourseProgresses?: IUserCourseProgress[];
}

const CourseSchema = new Schema<ICourse>(
  {
    name: { type: String, required: true },
    description: { type: String },
    phone: { type: String, required: true, unique: true },
    published: { type: Boolean, default: false },
    duration: { type: String, required: false, default: "" },
    learning: { type: [String], required: false, default: [] },
    requirements: { type: [String], required: false, default: [] },
    team: {
      type: [
        {
          avatar: { type: String },
          name: { type: String, required: true },
          role: { type: String, required: true },
          linkedin: { type: String },
        }
      ],
      required: false,
      default: []
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

CourseSchema.virtual("modules", {
  ref: "Module",
  localField: "_id",
  foreignField: "course",
  justOne: false,
});

const Course = model<ICourse>("Course", CourseSchema);

export default Course;
