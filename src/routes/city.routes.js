import { Router } from "express";
import { createCity, getAllCities } from "../controllers/cityController.js";

const router = Router();

router.post("/cities", createCity);
router.get("/cities", getAllCities);

export default router;
