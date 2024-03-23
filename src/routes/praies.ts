import { Router } from "express";
import { handleCreatePray, handleDeletePray } from "../controllers/praies.controllers";
const router = Router();

router.post("/", handleCreatePray);
router.delete("/:id", handleDeletePray);





export default router;
