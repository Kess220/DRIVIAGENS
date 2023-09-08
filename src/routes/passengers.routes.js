import { Router } from "express";
import { createPassengerController } from "../controllers/PassengerController.js";

const router = Router();

router.post("/passengers", createPassengerController);

export default router;
