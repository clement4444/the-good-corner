import express from "express";
import dotenv from "dotenv";
import { dataSource } from "./config/db";
import { Ad } from "./entities/ad";
import { Category } from "./entities/category";
import { Tag } from "./entities/tag";

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

//les routes ads----------------------------------------------------

app.get("/ads", async (_req, res) => {
  try {
    //récupére tout les articles
    const ads = await Ad.find({
      relations: {
        tags: true,
        categories: true
      },
    });

    //renvoyer les articles
    res.status(200).send(ads);
  } catch (error) {
    res.status(500).send("erreur lors de la récupération des articles");
  }
});

app.post("/ads", (req, res) => {
  try {
    // récuprére les données du body
    const { title, description, owner, price, picture, location, createdAt, category_id } = req.body;

    const ad = new Ad();
    ad.title = title;
    ad.description = description;
    ad.owner = owner;
    ad.price = price;
    ad.picture = picture;
    ad.location = location;
    ad.createdAt = createdAt;
    ad.categories = category_id;
    ad.save();

    //message reponse
    res.status(201).send("article bien ajouté");
  } catch (error) {
    res.status(500).send("erreur lors de l'ajout de l'article");
  }
});

app.delete("/ads/:id", (req, res) => {
  try {
    const id = req.params.id;
    //supprimer l'article
    Ad.delete(id);

    //renvoyer une réponse
    res.status(200).send("article supprimé");
  } catch (error) {
    res.status(500).send("erreur lors de la suppression de l'article");
  }
});

app.put("/ads/:id", async (req, res) => {
  try {
    // récuprére les données du body & l'id
    const body = req.body;
    const id = Number.parseInt(req.params.id);

    //met a jour l'article en fonction des informations du body
    await Ad.update({ id: id }, body);

    //message reponse
    res.status(200).send("article modifié avec succès");
  } catch (error) {
    //renvoyer un message eurreur
    res.status(500).send("erreur lors de la modification de l'article");
  }
});

//les routes categories----------------------------------------------------

app.get("/categories", async (_req, res) => {
  try {
    //récupére tout les categories
    const categories = await Category.find();

    //renvoyer les categories
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send("erreur lors de la récupération des categories");
  }
});

app.post("/categories", (req, res) => {
  try {
    // récuprére les données du body
    const { nom } = req.body;

    const categorie = new Category();
    categorie.nom = nom;
    categorie.save();

    //message reponse
    res.status(201).send("categorie bien ajouté");
  } catch (error) {
    res.status(500).send("erreur lors de l'ajout de la catégorie");
  }
});

//les routes tags----------------------------------------------------------

app.get("/tags", async (_req, res) => {
  try {
    //récupére tout les tages
    const tages = await Tag.find();

    //renvoyer les tages
    res.status(200).send(tages);
  } catch (error) {
    res.status(500).send("erreur lors de la récupération des tages");
  }
});

app.post("/tags", (req, res) => {
  try {
    // récuprére les données du body
    const { nom } = req.body;

    const tag = new Tag();
    tag.nom = nom;
    tag.save();

    //message reponse
    res.status(201).send("tag bien ajouté");
  } catch (error) {
    res.status(500).send("erreur lors de l'ajout de la tag");
  }
});

//ecouter de api-----------------------------------------------------------

app.listen(port, async () => {
  //initialisation de la base de donnée
  await dataSource.initialize();

  //récupére les catégories
  const category = await Category.find();

  //verifie si il y a au moins une catégorie
  if (category.length === 0) {
    //créer une catégorie par défaut
    const categoryDefaut = new Category();
    categoryDefaut.nom = "defaut";
    categoryDefaut.save();
  }
  //log de démarrage
  console.info(`Serveur lancer sur le port ${port} ✅`);
  console.log(`\n\x1b[38;5;81m\x1b]8;;http://localhost:${port}/\x1b\\http://localhost:${port}/\x1b]8;;\x1b\\\x1b[39m`);
});