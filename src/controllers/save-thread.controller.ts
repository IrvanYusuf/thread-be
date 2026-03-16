import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import Validation from "../lib/validation";
import { SavedThreadValidatorSchema } from "../validations/saved-thread.validator";

class SaveThreadController {
  async index(req: Request, res: Response) {
    const userId = req.user?.userId;

    const savedThreads = await prisma.saveThread.findMany({
      where: { userId: userId?.toString() },
      include: {
        user: { omit: { password: true } },
        thread: {
          include: {
            category: true,
            comments: {
              include: {
                author: { omit: { password: true } },
              },
            },
          },
        },
      },
    });

    return res.json({
      message: "Saved threads retrieved successfully",
      data: savedThreads,
    });
  }

  async store(req: Request, res: Response) {
    const userId = req.user?.userId;
    const validated = Validation.validate(SavedThreadValidatorSchema, req.body);
    const thread = await prisma.saveThread.findFirst({
      where: { userId: userId?.toString(), threadId: validated.threadId },
    });

    if (thread) {
      await prisma.saveThread.delete({
        where: { id: thread.id },
      });

      return res.json({
        message:
          "Thread already saved, so it has been removed from saved threads",
        data: {},
      });
    }

    const savedThread = await prisma.saveThread.create({
      data: {
        userId: userId!.toString(),
        threadId: validated.threadId!,
      },
    });

    return res.status(201).json({
      message: "Thread saved successfully",
      data: savedThread,
    });
  }
}

export default new SaveThreadController();
