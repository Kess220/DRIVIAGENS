import express from "express";
import { createFlightController } from "../controllers/flightController.js";

const router = express.Router();

router.post("/flights", createFlightController);

export default router;
