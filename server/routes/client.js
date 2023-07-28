import express from "express";
import {
  getProducts,
  getAllClients,
  getTransactions,
  getGeography,
} from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/getAllClients", getAllClients);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;
