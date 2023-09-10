import {
  createTravelRepo,
  isPassengerValid,
  isFlightValid,
} from "../repository/travelRepository.js";
import HttpStatus from "http-status";

async function createTravel(passengerId, flightId) {
  try {
    if (!isInteger(passengerId) || !isInteger(flightId)) {
      return {
        error: "IDs de passageiro e voo devem ser números inteiros",
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    if (!(await isPassengerValid(passengerId))) {
      return {
        error: "Passageiro não encontrado",
        status: HttpStatus.NOT_FOUND,
      };
    }

    if (!(await isFlightValid(flightId))) {
      return {
        error: "Voo não encontrado",
        status: HttpStatus.NOT_FOUND,
      };
    }

    // Crie a viagem no banco de dados
    const newTravel = await createTravelRepo(passengerId, flightId);

    return {
      data: newTravel,
      status: HttpStatus.CREATED,
    };
  } catch (error) {
    return {
      error: "Erro ao criar viagem: " + error.message,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }
}

// Função para validar se um valor é um número inteiro
function isInteger(value) {
  return Number.isInteger(Number(value));
}

export { createTravel };
