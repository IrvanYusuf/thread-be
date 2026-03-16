import { Router } from "express";
import CommentController from "../controllers/comment.controller";
import authenticateToken from "../middlewares/authenticatedToken";

const router = Router();

router.get("/", CommentController.index);
router.post("/:threadId", authenticateToken, CommentController.store);

export default router;
