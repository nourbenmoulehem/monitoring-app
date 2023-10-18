import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { verify } from "jsonwebtoken";
import { accessChat, addToGroup, createGroupChat, fetchChats, removeFromGroup, renameGroup } from "../controllers/chatController.js";

const router = express.Router();

router.post('/', verifyToken, accessChat);
router.get('/', verifyToken, fetchChats);
router.post('/group', verifyToken, createGroupChat);
router.put('/rename', verifyToken, renameGroup);
router.put('/groupremove', verifyToken, removeFromGroup);
router.put('/groupaddUser', verifyToken, addToGroup);



export default router;