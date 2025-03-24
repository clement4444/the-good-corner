import { Router } from "express";
import tagController from "../controllers/tagController";

const router = Router();

router.get("/", tagController.getAll);
router.post("/", tagController.create);

export default router;