import { db } from "../database/database.connection.js";
import { parse } from "date-fns";

async function isDateValid(date) {
  try {
    const currentDate = new Date();
    const inputDate = parse(date, "dd-MM-yyyy", new Date());

    return inputDate > currentDate;
  } catch (error) {
    throw new Error("Erro ao verificar a validade da data");
  }
}

async function isCityValid(cityId) {
  try {
    const query = `
      SELECT COUNT(*) FROM cities WHERE id = $1;
    `;

    const values = [cityId];

    const result = await db.query(query, values);
    const count = result.rows[0].count;

    return count > 0; // Retorna true se a cidade com o ID especificado existe, caso contrário, retorna false.
  } catch (error) {
    throw new Error("Erro ao verificar a validade da cidade no banco de dados");
  }
}

async function createFlightRepo(origin, destination, date) {
  try {
    // Verifica se as cidades de origem e destino são válidas
    const isOriginValid = await isCityValid(origin);
    const isDestinationValid = await isCityValid(destination);

    if (!isOriginValid || !isDestinationValid) {
      throw new Error("Cidade de origem ou destino inválida");
    }

    const query = `
      INSERT INTO flights (origin, destination, date)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const values = [origin, destination, date];

    const result = await db.query(query, values);

    return result.rows[0];
  } catch (error) {
    throw new Error("Erro ao criar voo no banco de dados");
  }
}

async function getAllFlightsRepo() {
  try {
    const query = `
      SELECT * FROM flights;
    `;

    const result = await db.query(query);

    return result.rows;
  } catch (error) {
    throw Error("Erro ao buscar voos no banco de dados");
  }
}

export { createFlightRepo, getAllFlightsRepo, isCityValid, isDateValid };
