import { createTravel } from "../services/travelService.js";
import HttpStatus from "http-status";

const createTravelController = async (req, res) => {
  try {
    const { passengerId, flightId } = req.body;

    const result = await createTravel(passengerId, flightId);

    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }

    return res.status(result.status).json(result.data);
  } catch (error) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Erro interno do servidor" });
  }
};

export { createTravelController };
