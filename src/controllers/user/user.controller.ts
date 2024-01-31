import { FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../../interface';
import prisma from '../../database/client';
import formatPrismaError from '../../utils/formatPrismaError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';



const handleCreateUser = async (req: FastifyRequest<{ Body: User }>, res: FastifyReply) => {
    try {
        const { name, email, age, city, total, streak, created_date, praies } = req.body;

        const result = await prisma.user.create({ data: { name, email, age, city, total, streak, created_date } })

        res.status(200).send(result)

    } catch (error: any) {
        if (error as PrismaClientKnownRequestError) {
            const formattedError = formatPrismaError(error);
            res.status(formattedError.statusCode).send({ message: formattedError.error });
        } else {
            res.status(404).send({ message: "Something didn't work, try again." });
        }
    }
}



const handleGetUser = async (req: FastifyRequest<{ Params: { email: string }, Querystring: { praies: string } }>, res: FastifyReply) => {
    const include = {
        praies: false
    }
    if (req.query.praies) {
        include.praies = true
    }

    try {
        const result = await prisma.user.findUnique({
            include,
            where: { email: req.params.email }
        })

        res.status(200).send(result)
    } catch (error: any) {
        if (error as PrismaClientKnownRequestError) {
            const formattedError = formatPrismaError(error);
            res.status(formattedError.statusCode).send({ message: formattedError.error });
        } else {
            res.status(404).send({ message: "Something didn't work, try again." });
        }
    }
}



const handleGetTopStreakUser = async (req: FastifyRequest<{ Params: { skip: number, take: number }, Querystring: { praies: string } }>, res: FastifyReply) => {
    const include = {
        praies: false
    }
    if (req.query.praies) {
        include.praies = true
    }

    try {
        const result = await prisma.user.findMany({
            include,
            skip: Number(req.params.skip),
            take: Number(req.params.take),
            orderBy: [
                { streak: 'asc' }
            ],
        })

        res.status(200).send(result)

    } catch (error: any) {
        if (error as PrismaClientKnownRequestError) {
            const formattedError = formatPrismaError(error);
            res.status(formattedError.statusCode).send({ message: formattedError.error });
        } else {
            res.status(404).send({ message: "Something didn't work, try again." });
        }
    }
}



const handleGetTopTotalUser = async (req: FastifyRequest<{ Params: { skip: number, take: number }, Querystring: { praies: string } }>, res: FastifyReply) => {
    const include = {
        praies: false
    }
    if (req.query.praies) {
        include.praies = true
    }

    try {
        const result = await prisma.user.findMany({
            include,
            skip: Number(req.params.skip),
            take: Number(req.params.take),
            orderBy: [
                { streak: 'asc' }
            ],
        })

        res.status(200).send(result)
    } catch (error: any) {
        if (error as PrismaClientKnownRequestError) {
            const formattedError = formatPrismaError(error);
            res.status(formattedError.statusCode).send({ message: formattedError.error });
        } else {
            res.status(404).send({ message: "Something didn't work, try again." });
        }
    }
}



const handleUpdateUser = async (req: FastifyRequest<{ Body: User }>, res: FastifyReply) => {
    const { name, email, age, city, total, streak } = req.body;
    try {
        const result = await prisma.user.update({
            where: { id: req.body.id },
            data: { name, email, age, city, total, streak }
        })
        res.status(200).send(result)

    } catch (error: any) {
        if (error as PrismaClientKnownRequestError) {
            const formattedError = formatPrismaError(error);
            res.status(formattedError.statusCode).send({ message: formattedError.error });
        } else {
            res.status(404).send({ message: "Something didn't work, try again." });
        }
    }


}



const handleDeleteUser = async (req: FastifyRequest<{ Params: { email: string } }>, res: FastifyReply) => {
    try {
        const result = await prisma.user.delete({
            where: { email: req.params.email }
        })

        res.status(200).send(result)

    } catch (error: any) {
        if (error as PrismaClientKnownRequestError) {
            const formattedError = formatPrismaError(error);
            res.status(formattedError.statusCode).send({ message: formattedError.error });
        } else {
            res.status(404).send({ message: "Something didn't work, try again." });
        }
    }


}



export default {
    handleCreateUser,
    handleGetUser,
    handleGetTopStreakUser,
    handleGetTopTotalUser,
    handleUpdateUser,
    handleDeleteUser
}

