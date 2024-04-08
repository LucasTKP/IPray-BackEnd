import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../database/cliente";
import formatPrismaError from "../utils/formatPrismaErros";
import { Response } from "express";
import { Pray } from "@prisma/client";

export const handleCreatePray = async (
  req: { body: { id_user: number; date: Date } },
  res: Response
) => {
  try {
    const { id_user } = req.body;
    const date = new Date(req.body.date);

    console.log(date);

    const result = await prisma.pray.create({ data: { id_user, date } });

    const response = await prisma.user.update({
      where: { id: id_user },
      data: {
        total: {
          increment: 1,
        },
      },
    });

    res.status(201).send(result);
  } catch (error: any) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      const formattedError = formatPrismaError(error);
      res
        .status(formattedError.statusCode)
        .send({ error: formattedError.error, message: formattedError.message })
        .end();
    } else {
      res.status(404).send({ message: "Something didn't work, try again." });
    }
  }
};

export const handleDeletePray = async (
  req: { params: { idUser: string; date: string } },
  res: Response
) => {
  try {
    const newDate = new Date(req.params.date);

    const result = await prisma.pray.findFirst({
      where: { id_user: Number(req.params.idUser), date: newDate },
    });

    if (result) {
      await prisma.pray.delete({
        where: { id: result.id },
      });

      await prisma.user.update({
        where: { id: result.id_user },
        data: {
          total: {
            decrement: 1,
          },
        },
      });
    }

    res.status(200).send(result);
  } catch (error: any) {
    if (error as PrismaClientKnownRequestError) {
      const formattedError = formatPrismaError(error);
      res
        .status(formattedError.statusCode)
        .send({ error: formattedError.error, message: formattedError.message })
        .end();
    } else {
      res.status(404).send({ message: "Something didn't work, try again." });
    }
  }
};

export const handleGetPray = async (
  req: { params: { idUser: string; date: string } },
  res: Response
) => {
  const newDate = new Date(req.params.date);
  try {
    const result = await prisma.pray.findFirst({
      where: { id_user: Number(req.params.idUser), date: newDate },
    });

    res.status(200).send(result);
  } catch (error: any) {
    if (error as PrismaClientKnownRequestError) {
      const formattedError = formatPrismaError(error);
      res
        .status(formattedError.statusCode)
        .send({ error: formattedError.error, message: formattedError.message })
        .end();
    } else {
      res.status(404).send({ message: "Something didn't work, try again." });
    }
  }
};
