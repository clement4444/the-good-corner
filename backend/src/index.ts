import app from "./app";
import dotenv from "dotenv";
import { dataSource } from "./config/db";

dotenv.config();
const port = process.env.SERVEUR_PORT || 3000;

const startServer = async () => {
  try {
    await dataSource.initialize();
    console.info(`Base de donnée connectée ✅`);

    app.listen(port, () => {
      console.info(`Serveur lancer sur le port ${port} ✅`);
      console.info(`\n\x1b[38;5;81m\x1b]8;;http://localhost:${port}/\x1b\\http://localhost:${port}/\x1b]8;;\x1b\\\x1b[39m`);
    });
  } catch (error) {
    console.error(`❌ Erreur de démarrage du serveur: ${error}`);
  }
};

startServer();