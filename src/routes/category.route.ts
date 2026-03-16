import express from "express";
import CategoryController from "../controllers/category.controller";
import authenticateToken from "../middlewares/authenticatedToken";

const router = express.Router();

router.get("/", authenticateToken, CategoryController.index);
router.post("/", authenticateToken, CategoryController.store);
router.get("/:id", authenticateToken, CategoryController.show);

export default router;
