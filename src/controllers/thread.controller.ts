import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import Validation from "../lib/validation";
import { createThreadSchema } from "../validations/thread.validator";

class ThreadController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const threads = await prisma.thread.findMany({
        include: {
          author: {
            omit: { password: true },
          },
          category: true,
          comments: {
            include: {
              author: { omit: { password: true } },
            },
          },
          _count: {
            select: { likes: true, comments: true },
          },
        },
      });

      return res.json({
        message: "Threads retrieved successfully",
        data: threads,
      });
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = Validation.validate(createThreadSchema, req.body);
      const userId = req.user?.userId;

      const thread = await prisma.thread.create({
        data: {
          title: validated.title,
          content: validated.content,
          categoryId: validated.categoryId,
          authorId: userId!.toString(),
        },
        include: {
          author: {
            omit: { password: true },
          },
          category: true,
        },
      });

      return res.status(201).json({
        message: "Thread created successfully",
        data: thread,
      });
    } catch (error) {
      next(error);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const thread = await prisma.thread.findUnique({
        where: { id: id.toString() },
        include: {
          author: {
            omit: { password: true },
          },
          category: true,
          comments: {
            include: {
              author: { omit: { password: true } },
            },
          },
          _count: {
            select: { likes: true, comments: true },
          },
        },
      });

      if (!thread) {
        return res.status(404).json({
          message: "Thread not found",
        });
      }

      return res.json({
        message: "Thread retrieved successfully",
        data: thread,
      });
    } catch (error) {
      next(error);
    }
  }

  async showByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;
      const threads = await prisma.thread.findMany({
        where: { categoryId: categoryId.toString() },
        include: {
          author: { omit: { password: true } },
          category: true,
          comments: {
            include: {
              author: { omit: { password: true } },
            },
          },
          _count: {
            select: { likes: true, comments: true },
          },
        },
      });

      return res.json({
        message: "Threads retrieved successfully",
        data: threads,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ThreadController();
