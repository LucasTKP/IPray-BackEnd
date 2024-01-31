import { FastifyInstance } from "fastify";
import { prayController } from "../controllers";

const prayRoute = async (app:FastifyInstance) => {
    app.post("/", prayController.handleCreatePray)
    app.delete("/:id", prayController.handleDeletePray)
}

export default prayRoute;