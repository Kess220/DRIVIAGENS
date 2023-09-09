import {
  createFlightRepo,
  getAllFlightsRepo,
  isCityValid,
  isDateValid,
} from "../repository/flightRepository.js";
import { createFlightSchema } from "../validation/flightSchema.js";
import HttpStatus from "http-status";
import { parse } from "date-fns";

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

    // Verifica se as cidades de origem e destino são válidas usando a função isCityValid
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

    // Verifica se a data é válida usando a função isDateValid
    const isDateValidResult = await isDateValid(date);

    if (!isDateValidResult) {
      return {
        error: "Data do voo deve ser maior que a data atual",
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    const newFlight = await createFlightRepo(origin, destination, date);

    return {
      data: newFlight,
      status: HttpStatus.CREATED,
    };
  } catch (error) {
    return {
      error: "Erro ao criar voo: " + error.message,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }
}

export { createFlight };
