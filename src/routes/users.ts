import { Request, Response, Router } from "express";
import { handleCreateUser } from "../controllers/users.controller";
const router = Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response) {
  res.send("Fetched all users");
});

/* POST a user */
router.post("/", handleCreateUser);

/* PATCH a user */
router.patch("/", function (req: Request, res: Response) {
  res.send("Updated a user");
});

/* DELETE a user */
router.delete("/", function (req: Request, res: Response) {
  res.send("Deleted a user");
});

export default router;
