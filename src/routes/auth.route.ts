import express from "express";
import AuthController from "../controllers/auth.controller";
import authenticateToken from "../middlewares/authenticatedToken";

const router = express.Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.get("/me", authenticateToken, AuthController.me);

export default router;
