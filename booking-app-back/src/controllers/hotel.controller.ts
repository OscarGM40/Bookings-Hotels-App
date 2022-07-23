import { NextFunction, Request, Response } from "express";
import { HotelModel } from "../models/Hotel";

export const createHotel = async (req: Request, res: Response, next: NextFunction) => {
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
  const { limit} = req.query;
  const { min,max, ...others} = req.query;
  try {
    const hotels = await HotelModel.find(
      {...others,
       cheapestPrice: {$gte: min || 1 ,$lte:max || 99999}
      })
    .limit(+limit!)
    .select("-updatedAt")
    .lean();
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req: Request, res: Response, next: NextFunction) => {
  const cities = (req.query?.cities as string).split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return HotelModel.countDocuments({ city: city });
      }),
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req: Request, res: Response, next: NextFunction) => {
  try {
  const hotelCount = await HotelModel.countDocuments({ type: "hotel" });
  const apartmentCount = await HotelModel.countDocuments({ type: "apartment" });
  const resortCount = await HotelModel.countDocuments({ type: "resort" });
  const villaCount = await HotelModel.countDocuments({ type: "villa" });
  const cabinCount = await HotelModel.countDocuments({ type: "cabin" });

  res.status(200).json( [
    { type:"hotel",count: hotelCount},
    { type:"apartment",count:apartmentCount},
    { type:"resort",count: resortCount},
    { type:"villa",count: villaCount},
    { type:"cabin",count: cabinCount}
  ]);
  } catch (err) {
    next(err);
  }
};
