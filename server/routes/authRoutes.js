import express from "express";
import { login, createNewUser, register } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";
import { refreshToken } from "../controllers/auth.js";
import { getUser } from "../controllers/auth.js";

const router = express.Router();

//attach different request for this router
router.post('/', login)

router.get('/refresh', refreshToken, verifyToken, getUser)

router.post("/signup", createNewUser)

router.post("/register", register)

router.get("/user", verifyToken, getUser)
export default router;
