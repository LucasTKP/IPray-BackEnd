import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Response } from "express";
import prisma from "../database/cliente";
import formatPrismaError from "../utils/formatPrismaErros";
import { User } from "@prisma/client";

export const handleCreateUser= async (req: { body: User }, res: Response) => {
  try {
    const {
      name,
      email,
      age,
      state,
      city,
      urlImage,
      total,
      streak,
      created_date,
    } = req.body;

    const result = await prisma.user.create({
      data: {
        name,
        email,
        age,
        state,
        city,
        urlImage,
        total,
        streak,
        created_date,
      },
    });

    res.status(200).send(result);
  } catch (error: any) {
    if (error as PrismaClientKnownRequestError) {
      const formattedError = formatPrismaError(error);
      console.log(formattedError);
      res
        .status(formattedError.statusCode)
        .send({ message: formattedError.message });
    } else {
      res.status(404).send({ message: "Something didn't work, try again." });
    }
  }
};
