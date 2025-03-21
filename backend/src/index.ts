import express from "express";
import sqlite3 from "sqlite3";
import { dataSource } from "./config/db";

const app = express();
const port = 3000;
const db = new sqlite3.Database("./baseDonner/good_corner.sqlite")

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.get("/ads", (_req, res) => {
  db.all("SELECT * FROM AD", (err, rows) => {
    if (err) {
      res.status(500).send("Une erreur est survenue");
      return;
    }
    res.send(rows);
  })
});

app.post("/ads", (req, res) => {
  try {
    // récuprére les données du body
    const { title, description, owner, price, picture, location } = req.body;

    //prépare la requête
    const stmt = db.prepare(
      "INSERT INTO ad (title, description, owner, price, picture, location) VALUES (?, ?, ?, ?, ?, ?)"
    );
    stmt.run([
      title,
      description,
      owner,
      price,
      picture,
      location
    ]);

    //message reponse
    res.status(201).send("article bien ajouté");
  } catch (error) {
    //renvoyer un message eurreur
    res.status(500).send("erreur lors de l'ajout de l'article");
  }
});

app.delete("/ads/:id", (req, res) => {
  //prépare la requête
  const stmt = db.prepare("DELETE FROM AD WHERE id = ?;");
  //execution de la requête
  stmt.run([req.params.id]);

  //renvoyer une réponse
  res.status(200).send("article supprimé");
});

app.put("/ads/:id", (req, res) => {
  try {
    // récuprére les données du body
    const { title, description, owner, price, picture, location } = req.body;
    const id = req.params.id;

    //prépare la requête
    const stmt = db.prepare(
      "UPDATE AD SET title = ?, description = ?, owner = ?, price = ?, picture = ?, location = ? WHERE id = ?;"
    );
    //execution de la requête
    stmt.run([
      title,
      description,
      owner,
      price,
      picture,
      location,
      id
    ]);

    //message reponse
    res.status(200).send("article modifié avec succès");
  } catch (error) {
    //renvoyer un message eurreur
    res.status(500).send("erreur lors de la modification de l'article");
  }
});

app.listen(port, async () => {
  await dataSource.initialize();
  console.info(`Serveur lancer sur le port ${port} ✅`);
});