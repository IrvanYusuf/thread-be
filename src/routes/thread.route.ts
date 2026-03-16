import express from "express";
import ThreadController from "../controllers/thread.controller";
import authenticateToken from "../middlewares/authenticatedToken";

const router = express.Router();

// public routes
router.get("/", ThreadController.index);
router.get("/category/:categoryId", ThreadController.showByCategory);
router.get("/:id", ThreadController.show);

// private routes
router.post("/", authenticateToken, ThreadController.store);

export default router;
