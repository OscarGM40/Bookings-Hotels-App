import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { AuthRouter } from "./routes/auth.routes";
import { UsersRouter } from "./routes/users.routes";
import { HotelsRouter } from "./routes/hotels.routes";
import { RoomsRouter } from "./routes/rooms.routes";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to " + mongoose.connection.name + " database on MongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(express.json());

app.use("/api/auth", AuthRouter);
app.use("/api/users", UsersRouter);
app.use("/api/hotels", HotelsRouter);
app.use("/api/rooms", RoomsRouter);

declare global {
  interface Error {
    status?: number;
  }
}
app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT ?? 8000, () => {
  connect();
  console.log("Connected to backend on port " + process.env.PORT || 8000);
});
