import express from "express";
import { getTotalClients } from "../controllers/total.js";

const router = express.Router();

router.get("/totalClients", getTotalClients);

export default router;
