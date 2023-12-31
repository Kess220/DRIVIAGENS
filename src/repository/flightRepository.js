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

    return count > 0;
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

async function getAllFlightsRepo(queryParams) {
  try {
    let query = `
      SELECT f.id, c1.name AS origin, c2.name AS destination, f.date
      FROM flights f
      LEFT JOIN cities c1 ON f.origin = c1.id
      LEFT JOIN cities c2 ON f.destination = c2.id
      WHERE 1=1
    `;

    const { origin, destination, smallerDate, biggerDate } = queryParams;
    const values = [];

    if (origin) {
      query += " AND c1.name = $" + (values.length + 1) + "::text";
      values.push(origin);
    }

    if (destination) {
      query += " AND c2.name = $" + (values.length + 1) + "::text";
      values.push(destination);
    }

    if (smallerDate && biggerDate) {
      query +=
        " AND date BETWEEN $" +
        (values.length + 1) +
        " AND $" +
        (values.length + 2);
      values.push(smallerDate, biggerDate);
    }

    query += " ORDER BY date ASC";

    console.log("Generated SQL query:", query);
    console.log("Query values:", values);

    const result = await db.query(query, values);

    console.log("Query result:", result.rows);

    return result.rows;
  } catch (error) {
    throw new Error("Erro ao buscar voos no banco de dados: " + error.message);
  }
}

export { createFlightRepo, getAllFlightsRepo, isCityValid, isDateValid };
