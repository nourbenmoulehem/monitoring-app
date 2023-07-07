import express from "express";

import  getChequiers  from "../controllers/chequier.js";

const router = express.Router();

router.get("/getChequiers", getChequiers)

export default router;