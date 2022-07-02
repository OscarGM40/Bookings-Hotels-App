import { Router } from "express";
import { verifyAdmin } from '../utils/verifyToken';
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotel.controller";

const router = Router();

//CREATE
router.post("/",verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

//GET
router.get("/find/:id", getHotel);

//GET ALL
router.get("/", getHotels);

export const HotelsRouter = router;
