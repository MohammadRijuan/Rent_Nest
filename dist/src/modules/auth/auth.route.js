import { Router } from "express";
import { authControllers } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
const router = Router();
router.post("/register", authControllers.registerUser);
router.post("/login", authControllers.loginUser);
router.post("/refresh-token", authControllers.refreshToken);
router.get("/me", authMiddleware(Role.ADMIN, Role.TENANT, Role.LANDLORD), authControllers.getMyProfile);
export const authRoutes = router;
//# sourceMappingURL=auth.route.js.map