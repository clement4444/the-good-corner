import { Ad } from "../entities/ad";
import { RequestHandler } from "express";

const getAll: RequestHandler = async (_req, res, next) => {
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
        next(error);
    }
};

const create: RequestHandler = async (req, res, next) => {
    try {
        // récuprére les données du body
        const { title, description, owner, price, picture, location, category_id, tags } = req.body;

        const ad = new Ad();
        ad.title = title;
        ad.description = description;
        ad.owner = owner;
        ad.price = price;
        ad.picture = picture;
        ad.location = location;
        ad.categories = category_id;
        if (tags) {
            ad.tags = tags;
        }
        await ad.save();

        //message reponse
        res.status(201).send("article bien ajouté");
    } catch (error) {
        next(error);
    }
};

const update: RequestHandler = async (req, res, next) => {
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
        next(error);
    }
};

const remove: RequestHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        //supprimer l'article
        Ad.delete(id);

        //renvoyer une réponse
        res.status(200).send("article supprimé");
    } catch (error) {
        next(error);
    }
};

export default { getAll, create, update, remove };