import { Schema, model, Document } from "mongoose";

export interface IUserCourseAnswerAnswer {
  question: string;
  answer: string;
  createdAt: Date;
}

export interface IUserCourseAnswer extends Document {
  user: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  answers: IUserCourseAnswerAnswer[];
  createdAt: Date;
  updatedAt: Date;
}

const UserCourseAnswerSchema = new Schema<IUserCourseAnswer>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    answers: {
      type: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
          createdAt: { type: Date, required: true },
        }
      ]
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const UserCourseAnswer = model<IUserCourseAnswer>(
  "UserCourseAnswer",
  UserCourseAnswerSchema
);

export default UserCourseAnswer;
