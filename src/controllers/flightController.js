import { createFlight, getAllFlights } from "../services/flightService.js";
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

async function getAllFlightsController(req, res) {
  const queryParams = {
    origin: req.query.origin || null,
    destination: req.query.destination || null,
    smallerDate: req.query["smaller-date"] || null,
    biggerDate: req.query["bigger-date"] || null,
  };

  console.log("Query parameters:", queryParams); // Adicione esta linha

  try {
    const flights = await getAllFlights(queryParams);

    console.log("Response from getAllFlights:", flights); // Adicione esta linha

    return res.status(HttpStatus.OK).json(flights);
  } catch (error) {
    console.error("Error in getAllFlightsController:", error); // Adicione esta linha
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

export { createFlightController, getAllFlightsController };
