import { Ad } from "../../entities/ad";
import { RequestHandler } from "express";
import { ILike, FindOperator } from "typeorm";

interface WhereConditionType {
  categories?: { id: number };
  title?: FindOperator<string>;
}

const getAll: RequestHandler = async (req, res, next) => {
  try {
    //récupére le parametre categorie
    const categorieParams = req.query.categorie;
    const searchParams = req.query.search;

    // Prépare les conditions
    const whereCondition = {} as WhereConditionType;

    //si il a une categorie ajouter a la condition
    if (categorieParams) {
      whereCondition.categories = { id: Number(categorieParams) };
    }

    //si il a une recherche ajouter a la condition
    if (searchParams && searchParams !== "") {
      whereCondition.title = ILike(`%${searchParams}%`);
    }

    //récupére les articles en utilisant la condition préparé
    const ads = await Ad.find({
      relations: { tags: true, categories: true },
      where: whereCondition,
    });

    //renvoie une reponse
    res.status(200).send(ads);
  } catch (error) {
    next(error);
  }
};

const getById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    //récupére les articles en utilisant la condition préparé
    const ads = await Ad.find({
      relations: { tags: true, categories: true },
      where: { id: Number(id) }
    });

    //renvoie une reponse
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
      // adapte les tage de [1, 2] a [ { id: 1 }, { id: 2 } ]
      ad.tags = tags.map((el: string) => ({ id: Number.parseInt(el) }));
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

    //garde en mémoir les tage
    let tags;
    //verifie que c'est un tableau ou une chaine de caractere
    if (Array.isArray(body.tags)) {
      tags = body.tags ? body.tags.map((el: string) => ({ id: Number.parseInt(el) })) : undefined

      //si c'est pas un tableux on verifie si il est pas vide
    } else if (body.tags) {
      tags = [body.tags];
    }

    //suprime les tag du body
    delete body.tags;

    //met a jour l'article en fonction des informations du body
    await Ad.update({ id: id }, body);

    //mettre a jour les tag
    const adtags = await Ad.findOneByOrFail({ id: id });
    adtags.tags = tags;
    await adtags.save();

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

export default { getAll, getById, create, update, remove };