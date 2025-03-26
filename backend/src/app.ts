import express from "express";
import router from "./routes";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));

app.use("/", router);

app.use(errorHandler);

export default app;