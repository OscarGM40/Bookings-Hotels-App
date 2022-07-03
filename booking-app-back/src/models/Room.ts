import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Interfaz que describe las propiedades que son requeridas para crear una nueva Room
interface IRoom {
  title: string;
  price: number;
  maxPeople: number;
  desc: string;
  roomNumbers: {number: number, unavailableDates: string[]}[];
}

const RoomSchema = new Schema<IRoom>(
  {
    title: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    maxPeople: { type: Number, required: true },
    desc: { type: String, required: true },
    // {number: 101,unavailableDates: ["2020-01-01", "2020-01-02"]}
    roomNumbers: [{ number: Number, unavailableDates: [{ type: [Date] }] }],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const RoomModel = model<IRoom>("Room", RoomSchema);
