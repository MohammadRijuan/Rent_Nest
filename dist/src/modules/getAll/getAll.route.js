"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRoutes = void 0;
const express_1 = require("express");
const getAll_controller_1 = require("./getAll.controller");
const auth_1 = require("../../middlewares/auth");
const enums_1 = require("../../../generated/prisma/enums");
const router = (0, express_1.Router)();
router.get("/categories", getAll_controller_1.getAllControllers.getAllCategory);
router.get("/properties", getAll_controller_1.getAllControllers.getAllProperties);
router.get("/properties/:id", getAll_controller_1.getAllControllers.getPropertyById);
router.post("/rentals", (0, auth_1.authMiddleware)(enums_1.Role.TENANT), getAll_controller_1.getAllControllers.createRentals);
router.get("/rentals", getAll_controller_1.getAllControllers.getRentals);
router.get("/rentals/:id", getAll_controller_1.getAllControllers.getRentalById);
router.post("/reviews", (0, auth_1.authMiddleware)(enums_1.Role.TENANT), getAll_controller_1.getAllControllers.createReview);
exports.getAllRoutes = router;
//# sourceMappingURL=getAll.route.js.map