import { Prisma } from "@prisma/client";

interface ErrorResponse {
  statusCode: number;
  error: string;
  message: string;
}

export default function formatPrismaError(
  error: Prisma.PrismaClientKnownRequestError
): ErrorResponse {
  return {
    statusCode: 400, // ou outro código de status apropriado
    error: "Bad Request",
    message: error.message,
  };
}
