import { Router } from "express";
import passengersRouter from "./passengers.routes.js";
import cityRouter from "./city.routes.js";

const indexRouter = Router();

indexRouter.use(passengersRouter, cityRouter);

export default indexRouter;
