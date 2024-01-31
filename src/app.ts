import fastify, { FastifyServerOptions } from "fastify";
import { prayRoute, userRoute } from "./routes";


const App = (options: FastifyServerOptions) => {
    const app = fastify(options)

    app.get("/", async () => {
        return { hello: "world" }
    })

    app.register(userRoute, {prefix: "/api/v1/user"})
    app.register(prayRoute, {prefix: "/api/v1/pray"})
    return app
}

export default App;