"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../../middlewares/auth");
const enums_1 = require("../../../generated/prisma/enums");
const admin_controller_1 = require("./admin.controller");
const router = (0, express_1.Router)();
router.get("/users", (0, auth_1.authMiddleware)(enums_1.Role.ADMIN), admin_controller_1.adminControllers.getAlluser);
router.patch("/users/:id", (0, auth_1.authMiddleware)(enums_1.Role.ADMIN), admin_controller_1.adminControllers.updateUserById);
router.get("/properties", (0, auth_1.authMiddleware)(enums_1.Role.ADMIN), admin_controller_1.adminControllers.getAllProperties);
exports.adminRoutes = router;
//# sourceMappingURL=admin.route.js.map