import express from "express";
import SaveThreadController from "../controllers/save-thread.controller";
import authenticateToken from "../middlewares/authenticatedToken";

const router = express.Router();

router.get("/", authenticateToken, SaveThreadController.index);
router.post("/", authenticateToken, SaveThreadController.store);

export default router;
