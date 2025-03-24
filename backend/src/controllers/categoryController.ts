import { Category } from "../entities/category";
import e, { RequestHandler } from "express";

const getAll: RequestHandler = async (_req, res, next) => {
    try {
        //récupére tout les categories
        const categories = await Category.find();

        //renvoyer les categories
        res.status(200).send(categories);
    } catch (error) {
        next(error);
    }
};

const create: RequestHandler = async (req, res, next) => {
    try {
        // récuprére les données du body
        const { nom } = req.body;

        const categorie = new Category();
        categorie.nom = nom;
        await categorie.save();

        //message reponse
        res.status(201).send("categorie bien ajouté");
    } catch (error) {
        next(error);
    }
};

export default {
    getAll, create
};