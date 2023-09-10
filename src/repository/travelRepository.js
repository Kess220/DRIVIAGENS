import { db } from "../database/database.connection.js";

async function isPassengerValid(passengerId) {
  try {
    const result = await db.query(
      "SELECT COUNT(*) FROM passengers WHERE id = $1",
      [passengerId]
    );
    return result.rows[0].count > 0;
  } catch (error) {
    throw new Error(
      "Erro ao verificar a existência do passageiro no banco de dados"
    );
  }
}

async function isFlightValid(flightId) {
  try {
    const result = await db.query(
      "SELECT COUNT(*) FROM flights WHERE id = $1",
      [flightId]
    );
    return result.rows[0].count > 0;
  } catch (error) {
    throw new Error("Erro ao verificar a existência do voo no banco de dados");
  }
}

async function createTravelRepo(passengerId, flightId) {
  try {
    if (!(await isPassengerValid(passengerId))) {
      throw new Error("Passageiro não encontrado");
    }

    if (!(await isFlightValid(flightId))) {
      throw new Error("Voo não encontrado");
    }

    const query = `
      INSERT INTO travels (passenger_id, flight_id)
      VALUES ($1, $2)
      RETURNING *;
    `;

    const values = [passengerId, flightId];

    const result = await db.query(query, values);

    return result.rows[0];
  } catch (error) {
    throw new Error("Erro ao criar viagem no banco de dados: " + error.message);
  }
}

export { createTravelRepo, isPassengerValid, isFlightValid };
