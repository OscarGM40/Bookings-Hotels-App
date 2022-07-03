import { NextFunction, Request, Response } from "express";
import { HotelModel } from "../models/Hotel";
import { RoomModel } from "../models/Room";

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  const hotelId = req.params.hotelId;
  const newRoom = new RoomModel(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(201).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedRoom = await RoomModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};
// primero el hotelId,despues el id de la Room
export const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await RoomModel.findByIdAndDelete(req.params.id);
    try {
      await HotelModel.findByIdAndUpdate(req.params.hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const room = await RoomModel.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const getRooms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rooms = await RoomModel.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
