"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const auth_1 = require("../../middlewares/auth");
const enums_1 = require("../../../generated/prisma/enums");
const router = (0, express_1.Router)();
router.post("/create-category", (0, auth_1.authMiddleware)(enums_1.Role.LANDLORD, enums_1.Role.ADMIN), category_controller_1.categoryControllers.createCategory);
exports.categoryRoutes = router;
//# sourceMappingURL=category.route.js.map