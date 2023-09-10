import { db } from "../database/database.connection.js";

const createPassenger = async (firstName, second_name) => {
  try {
    const query = `
      INSERT INTO passengers (first_name,  second_name)
      VALUES ($1, $2)
      RETURNING *;
    `;

    const values = [firstName, second_name];

    const result = await db.query(query, values);

    console.log("Novo passageiro criado com sucesso:", result.rows[0]);

    return result.rows[0];
  } catch (error) {
    console.error("Erro ao criar passageiro no banco de dados:", error);
    throw new Error("Erro ao criar passageiro no banco de dados");
  }
};

async function getPassengersTravelsRepo(nameFilter) {
  try {
    let query = `
      SELECT p.first_name || ' ' || p.second_name AS passenger_name, COUNT(t.id) AS travels
      FROM passengers p
      LEFT JOIN travels t ON p.id = t.passenger_id
      GROUP BY p.first_name, p.second_name
    `;

    if (nameFilter) {
      query += ` HAVING p.first_name || ' ' || p.second_name ILIKE $1`;
    }

    query += ` ORDER BY travels DESC LIMIT 10`;

    const values = nameFilter ? [`%${nameFilter}%`] : [];

    const result = await db.query(query, values);

    return result.rows.map((row) => ({
      passenger: row.passenger_name,
      travels: parseInt(row.travels),
    }));
  } catch (error) {
    throw new Error("Error in getPassengersTravelsRepo: " + error.message);
  }
}

export { createPassenger, getPassengersTravelsRepo };
