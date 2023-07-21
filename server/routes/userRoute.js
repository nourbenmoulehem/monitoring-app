import express from "express";
import { getUsers, updateUser, deleteUser } from "../controllers/users.js";

const router = express.Router();

router.get("/getUsers", getUsers);
router.post("/updateUser", updateUser);
router.delete("/deleteUser/:id", deleteUser); 

export default router;
