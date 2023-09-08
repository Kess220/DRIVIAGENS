import cors from "cors";
import express from "express";
import indexRouter from "./routes/index.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(indexRouter);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`O servidor está rodando na porta ${port}!`)
);
