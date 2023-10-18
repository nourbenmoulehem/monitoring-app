import express from "express";
import { getUsers, updateUser, deleteUser, allUsers } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/getUsers", getUsers);
router.post("/updateUser", verifyToken, updateUser);
router.delete("/deleteUser/:id", verifyToken, deleteUser); 
router.get("/searchUser", allUsers)

export default router;
