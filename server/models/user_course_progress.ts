import { Schema, model, Document } from "mongoose";

interface IUserCourseProgress extends Document {
  user: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  topics: [
    {
      module: Schema.Types.ObjectId,
      topic: Schema.Types.ObjectId,
      createdAt: Date,
    }
  ];
  createdAt: Date;
  updatedAt: Date;
}

const UserCourseProgressSchema = new Schema<IUserCourseProgress>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    topics: { type: [
      {
        module: { type: Schema.Types.ObjectId, ref: "Module", required: true },
        topic: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
        createdAt: { type: Date, required: true },
      }
    ], required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const UserCourseProgress = model<IUserCourseProgress>(
  "UserCourseProgress",
  UserCourseProgressSchema
);

export default UserCourseProgress;
