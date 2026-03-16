import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import Validation from "../lib/validation";
import { CategoryValidatorSchema } from "../validations/category.validator";

class CategoryController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await prisma.category.findMany({});
      return res.json({
        message: "Categories retrieved successfully",
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const category = await prisma.category.findUnique({
        where: { id: id.toString() },
      });
      if (!category) {
        return res.status(404).json({
          message: "Category not found",
        });
      }
      return res.json({
        message: "Category retrieved successfully",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = Validation.validate(CategoryValidatorSchema, req.body);

      const category = await prisma.category.create({
        data: {
          name: validated.name,
        },
      });

      return res.status(201).json({
        message: "Category created successfully",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();
