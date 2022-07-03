import { Router } from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../controllers/room.controller";
import { verifyAdmin } from "../utils/verifyToken";

const router = Router();

//CREATE
router.post("/:hotelId",verifyAdmin, createRoom);

//UPDATE
router.put("/:id", verifyAdmin, updateRoom);

//DELETE
router.delete("/:hotelId/:id", verifyAdmin, deleteRoom);

//GET
router.get("/find/:id", getRoom);

//GET ALL
router.get("/", getRooms);


export const RoomsRouter = router;
