
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../database/cliente";
import formatPrismaError from "../utils/formatPrismaErros";
import { Response } from "express";
import { Pray } from "@prisma/client";

export const handleCreatePray = async (
  req:  {body: Pray },
  res: Response
) => {
  try {
    const id_user  = req.body.id_user;
    const date = new Date(req.body.date);
    console.log(date);

    const result = await prisma.pray.create({ data: { id_user, date } });

    res.status(201).send(result);
  } catch (error: any) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      const formattedError = formatPrismaError(error);
      res
        .status(formattedError.statusCode)
        .send({ error: formattedError.error, message: formattedError.message }).end();
    } else {
      res.status(404).send({ message: "Something didn't work, try again." });
    }
  }
};

export const handleDeletePray = async (
  req: {params:{id: string}},
  res: Response
) => {
  try {
    const result = await prisma.pray.delete({
      where: { id: Number(req.params.id) },
    });

    res.status(200).send(result);
  } catch (error: any) {
    if (error as PrismaClientKnownRequestError) {
      const formattedError = formatPrismaError(error);
      res
        .status(formattedError.statusCode)
        .send({ error: formattedError.error, message: formattedError.message }).end();
    } else {
      res.status(404).send({ message: "Something didn't work, try again." });
    }
  }
};

