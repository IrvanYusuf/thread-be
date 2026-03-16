import { NextFunction, Request, Response } from "express";
import Validation from "../lib/validation";
import { likeThreadSchema } from "../validations/like-thread.validator";
import { prisma } from "../lib/prisma";

class ThreadLikeController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const threadId = req.params.threadId;
      const validated = Validation.validate(likeThreadSchema, { threadId });
      const threadLikes = await prisma.threadLike.findMany({
        where: { threadId: validated.threadId },
        include: {
          user: {
            omit: { password: true },
          },
        },
      });

      return res.json({
        message: "Thread likes retrieved successfully",
        data: threadLikes,
      });
    } catch (error) {
      next(error);
    }
  }
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const threadId = req.params.threadId;
      const validated = Validation.validate(likeThreadSchema, { threadId });

      const thread = await prisma.threadLike.findFirst({
        where: { userId: userId?.toString(), threadId: validated.threadId },
      });

      if (thread) {
        await prisma.threadLike.delete({
          where: { id: thread.id },
        });

        return res.json({
          message: "Thread already liked, so it has been unliked",
          data: {},
        });
      }

      const likeThread = await prisma.threadLike.create({
        data: {
          userId: userId?.toString()!,
          threadId: validated.threadId,
        },
      });
      return res.status(201).json({
        message: "Thread liked successfully",
        data: likeThread,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ThreadLikeController();
