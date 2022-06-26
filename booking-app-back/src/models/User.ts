import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface User {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

const UserSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

export const UserModel = model<User>("User", UserSchema);
