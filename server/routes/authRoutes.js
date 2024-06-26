import express from "express";
import { login, createNewUser, register, verifyUser, forgetPassword, resetPassword, createPassword } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";
import { refreshToken } from "../controllers/auth.js";
import { getUser, logout } from "../controllers/auth.js";

const router = express.Router();

//attach different request for this router
router.post('/', login);

router.get('/refresh', refreshToken, verifyToken, getUser);

router.post("/signup", createNewUser);

router.post("/register", register);

router.get("/user", verifyToken, getUser);

router.post("/verifyuser/:activationCode", verifyUser);

router.post("/forgetPassword", forgetPassword);

router.post("/reset-password/:id/:token", resetPassword);

router.post("/create-password/:id/:token", createPassword);

router.post('/logout', verifyToken, logout);

router.post("/createNewUser", createNewUser)

export default router;