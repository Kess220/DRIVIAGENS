import { createPassengerService } from "../services/PassengerService.js";
import HttpStatus from "http-status";

const createPassengerController = async (req, res) => {
  const { firstName, second_name } = req.body;

  try {
    const newPassenger = await createPassengerService(firstName, second_name);
    res.status(HttpStatus.CREATED).json(newPassenger);
  } catch (error) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ error: error.message });
  }
};

export { createPassengerController };
