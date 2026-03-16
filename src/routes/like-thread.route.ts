import { Router } from "express";
import ThreadLikeController from "../controllers/thread-like.controller";
import authenticateToken from "../middlewares/authenticatedToken";

const router = Router();
router.post("/:threadId/like", authenticateToken, ThreadLikeController.store);
router.get("/:threadId", authenticateToken, ThreadLikeController.index);

export default router;
