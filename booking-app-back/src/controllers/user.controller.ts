import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/User";

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const User = await UserModel.findById(req.params.id);
    res.status(200).json(User);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const { min, max, ...others } = req.query;
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
