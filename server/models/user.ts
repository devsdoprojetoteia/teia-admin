import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface UserPublicData {
  id: string;
  name: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}
interface IUser extends Document {
  name: string;
  phone: string;
  password: string;
  passwordResetCode?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
  publicData(): UserPublicData;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwordResetCode: { type: String },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.publicData = function () {
  return {
    id: this._id,
    name: this.name,
    phone: this.phone,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  } as UserPublicData;
};

const User = model<IUser>("User", UserSchema);

export default User;
