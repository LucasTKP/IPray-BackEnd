import { FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../../database/client';
import { Pray } from '../../interface';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import formatPrismaError from '../../utils/formatPrismaError';

const handleCreatePray = async (req: FastifyRequest<{ Body: Pray }>, res: FastifyReply) => {
    try {
        const { id_user, date } = req.body;

        const result = await prisma.pray.create({ data: { id_user, date } })

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

const handleDeletePray = async (req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) => {
    try {
        const result = await prisma.pray.delete({
            where: { id: Number(req.params.id) }
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
    handleCreatePray,
    handleDeletePray
}