import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { Router } from "express";

import praiesRouter from "./routes/praies";
import usersRouter from "./routes/users";

const app = express();
const router = Router();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/v1/praies", praiesRouter);
app.use("/v1/users", usersRouter);
app.use('/', router.get('', (req, res) => res.send("Sucesso")));

export default app;
