import express from "express";
import getClientsStatYearly from "../controllers/clientsStats.js"

const router = express.Router();
router.get("/clientStats", getClientsStatYearly);

export default router;