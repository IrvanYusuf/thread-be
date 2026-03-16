import express from "express";
import authRoutes from "./auth.route";
import categoryRoutes from "./category.route";
import threadRoutes from "./thread.route";
import savedThreadsRoutes from "./save-thread.route";
import commentRoutes from "./comment.route";
import likeThreadRoutes from "./like-thread.route";
// admin
import adminUserRoutes from "./admin/admin-user.route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/threads", threadRoutes);
router.use("/saved-threads", savedThreadsRoutes);
router.use("/comments", commentRoutes);
router.use("/like-threads", likeThreadRoutes);
// admin
router.use("/admin/users", adminUserRoutes);

export default router;
