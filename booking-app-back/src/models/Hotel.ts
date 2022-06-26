import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface Hotel {
  name: string;
  type: string; // "hotel" or "apartment" or "motel" or whatever
  city: string;
  address: string;
  distance: string;
  photos?: string[];
  desc: string;
  rating?: number;
  rooms?: string[];
  cheapestPrice: number;
  featured?: boolean;
}

const HotelSchema = new Schema<Hotel>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    distance: { type: String, required: true },
    photos: { type: [String] },
    desc: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5 },
    rooms: { type: [String], min: 0, max: 5 },
    cheapestPrice: { type: Number, required: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

export const HotelModel = model<Hotel>("Hotel", HotelSchema);
