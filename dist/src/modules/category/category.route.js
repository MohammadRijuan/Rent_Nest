import { Router } from "express";
import { categoryControllers } from "./category.controller";
import { authMiddleware } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
const router = Router();
router.post("/create-category", authMiddleware(Role.LANDLORD, Role.ADMIN), categoryControllers.createCategory);
export const categoryRoutes = router;
//# sourceMappingURL=category.route.js.map