import mongoose, { Model } from "mongoose";
const { Schema, model } = mongoose;

// Interfaz que describe las propiedades que son requeridas para crear un nuevo User
interface UserAttrs {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}
interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

interface UserModel extends Model<UserDocument> {
  build(attrs: UserAttrs): UserDocument;
}

const UserSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        // ret.id = ret._id;
        // delete ret._id;
        delete ret.password;
        delete ret.__v; // versionKey:false también hace lo mismo
      },
    },
  },
);

export const UserModel = model<UserDocument, UserModel>("User", UserSchema);
