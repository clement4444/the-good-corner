console.time("serveur démarrer");
import "reflect-metadata";
import dotenv from "dotenv";
import { dataSource } from "./config/db";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { AdResolver } from "./resolvers/AdResolver";
import CategoryResolver from "./resolvers/categoryResolver";
import TagResolver from "./resolvers/tagResolver";
import { startStandaloneServer } from "@apollo/server/standalone";

dotenv.config();

const port = Number(process.env.SERVEUR_PORT) || 3000;

const startServer = async () => {
  try {
    //inisalize la base de donnée
    await dataSource.initialize();
    console.info(`🗄️ Base de donnée connectée ✅`);

    //confige le serveur graphql
    const shema = await buildSchema({ resolvers: [AdResolver, TagResolver, CategoryResolver] });

    const serveur = new ApolloServer({
      schema: shema
    });

    const { url } = await startStandaloneServer(serveur, {
      listen: { port: port },
    });

    console.info(`🚀 Serveur lancer sur: \x1b[38;5;81m${url}\x1b[39m ✅`);
    console.timeEnd("serveur démarrer");
  } catch (error) {
    console.error(`❌ Erreur de démarrage du serveur: ${error}`);
  }
}

startServer();