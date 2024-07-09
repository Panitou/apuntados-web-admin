// routes/users.routes.js
import { Router } from "express";
import {
  addUser,
  deleteUser,
  getUsers,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/users", addUser);
router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);

export default router;
