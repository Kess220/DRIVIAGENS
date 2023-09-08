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

export { createPassenger };
