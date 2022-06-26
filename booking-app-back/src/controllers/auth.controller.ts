import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/User";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new UserModel({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT!);

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      // TODO quitar el token de la respuesta
      .json({ user, token });
  } catch (err) {
    next(err);
  }
};
