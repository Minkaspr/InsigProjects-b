import { Router } from "express";
import userRoutes from "../user/user.controller";
import projectRoutes from "../project/project.controller";

const router = Router();

router.use("/users", userRoutes);
router.use("/projects", projectRoutes); 

export default router;