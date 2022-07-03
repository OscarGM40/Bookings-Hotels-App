import { NextFunction, Request, Response } from 'express';
import { HotelModel } from '../models/Hotel';

export const createHotel = async (req:Request, res:Response, next:NextFunction) => {
  const newHotel = new HotelModel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedHotel = await HotelModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await HotelModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hotel = await HotelModel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const getHotels = async (req: Request, res: Response, next: NextFunction) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await HotelModel.find();
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};


