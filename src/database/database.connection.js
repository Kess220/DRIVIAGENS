import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const configDatabase = {
  connectionString: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV === "production") configDatabase.ssl = true;

export const db = new Pool(configDatabase);

// Verificar a conexão com o banco de dados
db.connect()
  .then(() => {
    console.log("Conexão bem-sucedida com o banco de dados!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });
