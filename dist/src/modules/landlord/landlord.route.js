"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.landlordRoutes = void 0;
const express_1 = require("express");
const landlord_controller_1 = require("./landlord.controller");
const auth_1 = require("../../middlewares/auth");
const enums_1 = require("../../../generated/prisma/enums");
const router = (0, express_1.Router)();
router.post("/properties", (0, auth_1.authMiddleware)(enums_1.Role.LANDLORD, enums_1.Role.ADMIN), landlord_controller_1.landloardController.createProperty);
router.put("/properties/:id", (0, auth_1.authMiddleware)(enums_1.Role.LANDLORD, enums_1.Role.ADMIN), landlord_controller_1.landloardController.updateProperty);
router.delete("/properties/:id", (0, auth_1.authMiddleware)(enums_1.Role.LANDLORD, enums_1.Role.ADMIN), landlord_controller_1.landloardController.deleteProperty);
router.get("/requests", (0, auth_1.authMiddleware)(enums_1.Role.LANDLORD, enums_1.Role.ADMIN), landlord_controller_1.landloardController.getAllHisRentalRequ);
router.patch("/requests/:id", (0, auth_1.authMiddleware)(enums_1.Role.LANDLORD, enums_1.Role.ADMIN), landlord_controller_1.landloardController.updateRentalRequest);
exports.landlordRoutes = router;
//# sourceMappingURL=landlord.route.js.map