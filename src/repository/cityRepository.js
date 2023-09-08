import { db } from "../database/database.connection.js";

async function createCity(name) {
  try {
    const query = `
      INSERT INTO cities (name)
      VALUES ($1)
      RETURNING *;
    `;

    const values = [name];

    const result = await db.query(query, values);

    return result.rows[0];
  } catch (error) {
    throw new Error("Erro ao criar cidade no banco de dados");
  }
}

async function getAllCities() {
  try {
    const query = `
      SELECT * FROM cities;
    `;

    const result = await db.query(query);

    return result.rows;
  } catch (error) {
    throw new Error("Erro ao buscar cidades no banco de dados");
  }
}

async function getCityByName(name) {
  try {
    const query = `
      SELECT * FROM cities
      WHERE name = $1;
    `;

    const values = [name];

    const result = await db.query(query, values);

    return result.rows[0];
  } catch (error) {
    throw new Error("Erro ao buscar cidade por nome no banco de dados");
  }
}

export { createCity, getAllCities, getCityByName };
