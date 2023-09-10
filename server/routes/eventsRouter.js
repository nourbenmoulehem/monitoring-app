import express from "express";
import { createEvent, getEvents } from "../controllers/eventController";

const router = express.Router();

router.post('/create-event', createEvent);

router.get('/get-event', getEvents);