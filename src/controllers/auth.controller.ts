import { Request, Response } from "express";
import bcrypt from "bcrypt";
import CONFIG from "../config";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import Validation from "../lib/validation";
import { RegisterValidatorSchema } from "../validations/auth.validator";

class AuthController {
  async signup(req: Request, res: Response) {
    const validated = Validation.validate(RegisterValidatorSchema, req.body);

    const checkUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });
    if (checkUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(
      validated.password,
      CONFIG.SALT_ROUNDS,
    );
    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: hashedPassword,
      },
      omit: { password: true },
    });

    const token = jwt.sign({ userId: user.id! }, CONFIG.JWT_SECRET! as string, {
      expiresIn: CONFIG.EXPIRES_IN,
    });

    res
      .status(201)
      .json({ message: "User signed up successfully", data: { user, token } });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const validated = Validation.validate(RegisterValidatorSchema, {
      email,
      password,
    });

    const user = await prisma.user.findUnique({
      where: { email: validated.email },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(
      validated.password,
      user.password!,
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id! }, CONFIG.JWT_SECRET! as string, {
      expiresIn: CONFIG.EXPIRES_IN,
    });

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: "User logged in successfully",
      data: { user: userWithoutPassword, token },
    });
  }

  async me(req: Request, res: Response) {
    const userId = req.user?.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId?.toString() },
      omit: { password: true },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      message: "User retrieved successfully",
      data: user,
    });
  }
}

export default new AuthController();
