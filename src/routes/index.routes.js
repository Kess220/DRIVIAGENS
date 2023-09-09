import { Router } from "express";
import passengersRouter from "./passengers.routes.js";
import cityRouter from "./city.routes.js";
import flightRouter from "./flight.routes.js";

const indexRouter = Router();

indexRouter.use(passengersRouter, cityRouter, flightRouter);

export default indexRouter;
