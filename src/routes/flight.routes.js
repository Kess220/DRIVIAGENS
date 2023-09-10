import express from "express";
import {
  createFlightController,
  getAllFlightsController,
} from "../controllers/flightController.js";

const router = express.Router();

router.post("/flights", createFlightController);

router.get("/flights", getAllFlightsController);

export default router;
