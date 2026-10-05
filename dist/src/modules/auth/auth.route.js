"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_1 = require("../../middlewares/auth");
const enums_1 = require("../../../generated/prisma/enums");
const router = (0, express_1.Router)();
router.post("/register", auth_controller_1.authControllers.registerUser);
router.post("/login", auth_controller_1.authControllers.loginUser);
router.post("/refresh-token", auth_controller_1.authControllers.refreshToken);
router.get("/me", (0, auth_1.authMiddleware)(enums_1.Role.ADMIN, enums_1.Role.TENANT, enums_1.Role.LANDLORD), auth_controller_1.authControllers.getMyProfile);
exports.authRoutes = router;
//# sourceMappingURL=auth.route.js.map