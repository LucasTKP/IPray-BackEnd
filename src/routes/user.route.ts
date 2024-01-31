import { FastifyInstance } from "fastify";
import { userController } from "../controllers";

const userRoute = async (app:FastifyInstance) => {
    app.post('/', userController.handleCreateUser)
    app.get('/:email', userController.handleGetUser)
    app.get('/topStreak/:skip/:take', userController.handleGetTopStreakUser)
    app.get('/topTotal/:skip/:take', userController.handleGetTopTotalUser)
    app.put('/', userController.handleUpdateUser)
    app.delete("/:email", userController.handleDeleteUser)
}

export default userRoute;