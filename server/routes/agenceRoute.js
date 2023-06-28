import express from "express";
import getAllAgencies from "../controllers/agencies.js"

const router = express.Router();

router.get("/getAllagencies", getAllAgencies)

export default router;