import { createPassenger } from "../repository/PassengerRepository.js";

const createPassengerService = async (firstName, second_name) => {
  try {
    if (firstName.length < 2 || second_name.length < 2) {
      throw new Error("Nome e sobrenome devem ter pelo menos 2 caracteres.");
    }

    const newPassenger = await createPassenger(firstName, second_name);

    return newPassenger;
  } catch (error) {
    throw new Error("Erro ao criar passageiro: " + error.message);
  }
};

export { createPassengerService };
