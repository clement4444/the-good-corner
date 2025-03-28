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

const update: RequestHandler = async (req, res, next) => {
    try {
        // récuprére les données du body & l'id
        const body = req.body;
        const id = Number.parseInt(req.params.id);

        //met a jour le tag en fonction des informations du body
        await Tag.update({ id: id }, body);

        //message reponse
        res.status(200).send("tag modifié avec succès");
    } catch (error) {
        //renvoyer un message eurreur
        next(error);
    }
};

const remove: RequestHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        //supprimer le tag
        Tag.delete(id);

        //renvoyer une réponse
        res.status(200).send("tag supprimé");
    } catch (error) {
        next(error);
    }
};

export default {
    getAll,
    create,
    update,
    remove
}