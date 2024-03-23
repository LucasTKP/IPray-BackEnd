import { Router } from "express";
import { handleCreatePray } from "../controllers/praies.controllers";
const router = Router();



router.post("/", handleCreatePray);



export default router;
