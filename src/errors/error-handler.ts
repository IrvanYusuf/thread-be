import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import ApiError from "./api-error";
import { Prisma } from "../../generated/prisma/client";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.issues.map((e) => ({
        field: e.path.join("."), // misalnya: "name"
        message: e.message,
      })),
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      const model = err.meta?.modelName;
      return res.status(404).json({
        message: "Resource not found",
        errors: `${model} not found`,
      });
    }

    if (err.code === "P2002") {
      return res.status(409).json({
        message: "Data already exists",
        errors: `${err.meta?.target} already exists`,
      });
    }
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errors: err.message,
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });

  //   return ApiResponse.errorResponse(
  //     res,
  //     err.message || "Internal server error",
  //     err.details,
  //     null
  //   );
};

export default errorHandler;
