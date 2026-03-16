import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import Validation from "../lib/validation";
import { createCommentSchema } from "../validations/comment.validator";

class CommentController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const comments = await prisma.comment.findMany({
        include: {
          author: { omit: { password: true } },
        },
      });

      return res.json({
        message: "Comments retrieved successfully",
        data: comments,
      });
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const { threadId } = req.params;
      const userId = req.user?.userId;

      const body = { threadId, content: req.body.content };
      const validated = Validation.validate(createCommentSchema, body);

      const comment = await prisma.comment.create({
        data: {
          content: validated.content,
          authorId: userId?.toString()!,
          threadId: validated.threadId,
        },
      });
      return res.status(201).json({
        message: "Comment created successfully",
        data: comment,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CommentController();
