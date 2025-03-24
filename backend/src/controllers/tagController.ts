import { Tag } from "../entities/tag";
import { RequestHandler } from "express";

const getAll: RequestHandler = async (_req, res, next) => {
    try {
        //récupére tout les tages
        const tages = await Tag.find();

        //renvoyer les tages
        res.status(200).send(tages);
    } catch (error) {
        next(error);
    }
};

const create: RequestHandler = async (req, res, next) => {
    try {
        // récuprére les données du body
        const { nom } = req.body;

        const tag = new Tag();
        tag.nom = nom;
        await tag.save();

        //message reponse
        res.status(201).send("tag bien ajouté");
    } catch (error) {
        next(error);
    }
};

export default {
    getAll,
    create
}