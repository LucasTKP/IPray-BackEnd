import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Response } from "express";
import prisma from "../database/cliente";
import formatPrismaError from "../utils/formatPrismaErros";
import { User } from "@prisma/client";

export const handleCreateUser = async (req: { body: User }, res: Response) => {
  try {
    const { name, email, age, state, city, urlImage, total, streak} = req.body;

    const result = await prisma.user.create({
      data: { name, email, age, state, city, urlImage, total, streak, }
    });

    res.status(200).send(result).end();
  } catch (error: any) {
    if (error as PrismaClientKnownRequestError) {
      const formattedError = formatPrismaError(error);
      console.log(formattedError);
      res
        .status(formattedError.statusCode)
        .send({ error: formattedError.error, message: formattedError.message }).end();
    } else {
      res.status(404).send({ message: "Something didn't work, try again." });
    }
  }
};


export const handleGetUser = async (req: { query: { praies: boolean }, params: { email: string } }, res: Response) => {
  const include = {
    praies: false,
  };

  if (req.query.praies) {
    include.praies = true;
  }

  try {
    const result = await prisma.user.findUnique({
      include,
      where: { email: req.params.email },
    });

    res.status(200).send(result).end();
  } catch (error: any) {
    if (error as PrismaClientKnownRequestError) {
      const formattedError = formatPrismaError(error);
      res
        .status(formattedError.statusCode)
        .send({ error: formattedError.error, message: formattedError.message }).end();
    } else {
      res.status(404).send({ message: "Something didn't work, try again." }).end();
    }
  }
}


export const handleGetTopStreakUser = async (req: { query: { praies: boolean }, params: { skip: number, take: number } }, res: Response) => {
  const include = {
    praies: false,
  };
  if (req.query.praies) {
    include.praies = true;
  }

  try {
    const result = await prisma.user.findMany({
      include,
      skip: Number(req.params.skip),
      take: Number(req.params.take),
      orderBy: [{ streak: "asc" }],
    });

    res.status(200).send(result).end();
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
}


export const handleGetTopTotalUser = async (req: { query: { praies: boolean }, params: { skip: number, take: number } }, res: Response) => {
  const include = {
    praies: false,
  };
  if (req.query.praies) {
    include.praies = true;
  }

  try {
    const result = await prisma.user.findMany({
      include,
      skip: Number(req.params.skip),
      take: Number(req.params.take),
      orderBy: [{ streak: "asc" }],
    });

    res.status(200).send(result).end();
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
}

export const handleUpdateUser = async (req: { body: User }, res: Response) => {
  const { name, email, age, city, total, streak } = req.body;
  try {
    const result = await prisma.user.update({
      where: { id: req.body.id },
      data: { name, email, age, city, total, streak },
    });
    res.status(200).send(result).end();
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
}


export const handleDeletUser = async (req:{params: {email:string}}, res:Response) => {
  try {
    const result = await prisma.user.delete({
      where: { email: req.params.email },
    });

    res.status(200).send(result);
  } catch (error: any) {
    if (error as PrismaClientKnownRequestError) {
      const formattedError = formatPrismaError(error);
      res
        .status(formattedError.statusCode)
        .send({ message: formattedError.error });
    } else {
      res.status(404).send({ message: "Something didn't work, try again." });
    }
  }
}