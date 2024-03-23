import { Router } from "express";
import { handleCreateUser, handleGetTopStreakUser, handleGetTopTotalUser, handleGetUser, handleUpdateUser } from "../controllers/users.controller";
const router = Router();

router.post('/', handleCreateUser)
router.get('/:email', handleGetUser)
router.get('/topStreak/:skip/:take', handleGetTopStreakUser)
router.get('/topTotal/:skip/:take', handleGetTopTotalUser)
router.put('/', handleUpdateUser)
router.delete("/:email", handleCreateUser)


export default router;
