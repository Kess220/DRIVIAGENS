import {
  createPassengerService,
  getPassengersTravels,
} from "../services/PassengerService.js";
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

async function getPassengersTravelsController(req, res) {
  try {
    const { name } = req.query;

    const passengersTravels = await getPassengersTravels(name);

    if (passengersTravels.length > 10) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Too many results" });
    }

    passengersTravels.sort((a, b) => b.travels - a.travels);

    return res.status(HttpStatus.OK).json(passengersTravels);
  } catch (error) {
    console.error("Error in getPassengersTravelsController:", error);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
}

export { createPassengerController, getPassengersTravelsController };
