import express from "express";
import { createTravelController } from "../controllers/travelController.js";

const router = express.Router();

router.post("/travels", createTravelController);

export default router;
