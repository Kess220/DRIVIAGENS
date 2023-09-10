import { Router } from "express";
import {
  createPassengerController,
  getPassengersTravelsController,
} from "../controllers/PassengerController.js";

const router = Router();

router.post("/passengers", createPassengerController);
router.get("/passengers/travels", getPassengersTravelsController);

export default router;
