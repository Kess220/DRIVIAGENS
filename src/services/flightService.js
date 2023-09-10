import {
  createFlightRepo,
  getAllFlightsRepo,
  isCityValid,
  isDateValid,
} from "../repository/flightRepository.js";
import { createFlightSchema } from "../validation/flightSchema.js";
import HttpStatus from "http-status";
import { format } from "date-fns"; // Importe apenas a função 'format' do date-fns

async function createFlight(origin, destination, date) {
  try {
    const { error } = createFlightSchema.validate({
      origin,
      destination,
      date,
    });

    if (error) {
      return {
        error: "Dados inválidos: " + error.details[0].message,
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    const isOriginValid = await isCityValid(origin);
    const isDestinationValid = await isCityValid(destination);

    if (!isOriginValid || !isDestinationValid) {
      return {
        error: "Cidade de origem ou destino inválida",
        status: HttpStatus.NOT_FOUND,
      };
    }

    if (origin === destination) {
      return {
        error: "Origem e destino devem ser diferentes",
        status: HttpStatus.CONFLICT,
      };
    }

    const isDateValidResult = await isDateValid(date);

    if (!isDateValidResult) {
      return {
        error: "Data do voo deve ser maior que a data atual",
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    const newFlight = await createFlightRepo(origin, destination, date);

    return {
      data: {
        ...newFlight,
        date: format(newFlight.date, "dd-MM-yyyy"), // Formate a data antes de retorná-la
      },
      status: HttpStatus.CREATED,
    };
  } catch (error) {
    return {
      error: "Erro ao criar voo: " + error.message,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }
}

async function getAllFlights(queryParams) {
  try {
    const flights = await getAllFlightsRepo(queryParams);

    console.log("Flights found:", flights); // Adicione esta linha

    if (flights.length === 0) {
      return [];
    }

    // Formate as datas dos voos encontrados antes de retorná-los
    const formattedFlights = flights.map((flight) => ({
      ...flight,
      date: format(flight.date, "dd-MM-yyyy"),
    }));

    return formattedFlights;
  } catch (error) {
    console.error("Error in getAllFlights:", error); // Adicione esta linha
    throw new Error("Erro ao buscar voos no banco de dados");
  }
}

export { createFlight, getAllFlights };
