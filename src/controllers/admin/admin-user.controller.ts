import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

class AdminUserController {
  async index(req: Request, res: Response) {
    const users = await prisma.user.findMany({ omit: { password: true } });

    return res.json({
      message: "Users retrieved successfully",
      data: users,
    });
  }
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: id.toString() },
      omit: { password: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      message: "User retrieved successfully",
      data: user,
    });
  }
}

export default new AdminUserController();
