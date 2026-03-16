import express from "express";
import AdminUserController from "../../controllers/admin/admin-user.controller";
import authenticateToken from "../../middlewares/authenticatedToken";

const router = express.Router();

router.get("/", authenticateToken, AdminUserController.index);
router.get("/:id", authenticateToken, AdminUserController.show);

export default router;
