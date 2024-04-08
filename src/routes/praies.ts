import { Router } from "express";
import { handleCreatePray, handleDeletePray, handleGetPray } from "../controllers/praies.controllers";
const router = Router();

router.post("/", handleCreatePray);
router.delete("/:idUser/:date", handleDeletePray);
router.get("/:idUser/:date", handleGetPray);






export default router;
