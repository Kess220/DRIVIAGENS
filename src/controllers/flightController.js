import { createFlight } from "../services/flightService.js";
import HttpStatus from "http-status";

async function createFlightController(req, res) {
  const { origin, destination, date } = req.body;

  try {
    const result = await createFlight(origin, destination, date);

    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }

    return res.status(result.status).json(result.data);
  } catch (error) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

export { createFlightController };
