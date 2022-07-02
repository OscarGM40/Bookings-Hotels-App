import { Router } from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.controller";
import { verifyAdmin, verifyToken, verifyUser } from "./../utils/verifyToken";

const router = Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.status(200).json({
    message: "Authenticated.You have provided a token",
  });
});

router.get("/checkuser/:id", verifyToken, verifyUser, (req, res, next) => {
  res.status(200).json({
    user: req.user,
  });
});

router.get("/checkadmin", verifyToken,verifyAdmin, (req, res, next) => {
  res.status(200).json({
    user: req.user,
  });
});

//UPDATE
router.put("/:id",verifyUser, updateUser);

//DELETE
router.delete("/:id",verifyUser, deleteUser);

//GET
router.get("/find/:id",verifyUser, getUser);

//GET ALL
router.get("/",verifyAdmin, getUsers);

export const UsersRouter = router;
