"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../../middlewares/auth");
const enums_1 = require("../../../generated/prisma/enums");
const payment_controller_1 = require("./payment.controller");
const router = (0, express_1.Router)();
router.post("/create", (0, auth_1.authMiddleware)(enums_1.Role.TENANT), payment_controller_1.paymentsController.createPayment);
router.post("/confirm", payment_controller_1.paymentsController.confirmPayment);
router.get("/", (0, auth_1.authMiddleware)(enums_1.Role.TENANT), payment_controller_1.paymentsController.getPayments);
router.get("/:id", (0, auth_1.authMiddleware)(enums_1.Role.TENANT), payment_controller_1.paymentsController.getPaymentById);
exports.getPaymentRoutes = router;
//# sourceMappingURL=payment.route.js.map