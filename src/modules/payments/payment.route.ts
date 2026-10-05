import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { paymentsController } from "./payment.controller";

const router = Router()

router.post("/create",authMiddleware(Role.TENANT), paymentsController.createPayment)

router.post("/confirm",paymentsController.confirmPayment)

router.get("/",authMiddleware(Role.TENANT),paymentsController.getPayments)

router.get("/:id",authMiddleware(Role.TENANT),paymentsController.getPaymentById)


export const getPaymentRoutes = router