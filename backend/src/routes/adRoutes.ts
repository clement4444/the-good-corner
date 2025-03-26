import { Router } from "express";
import adController from "../controllers/adController";

const router = Router();

router.get("/", adController.getAll);
router.get("/categorie/:id", adController.getByCategorie);
router.post("/", adController.create);
router.put("/:id", adController.update);
router.delete("/:id", adController.remove);

export default router;