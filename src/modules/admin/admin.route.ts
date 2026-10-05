import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { adminControllers } from "./admin.controller";

const router = Router()


router.get("/users", authMiddleware(Role.ADMIN),adminControllers.getAlluser)


router.patch("/users/:id",authMiddleware(Role.ADMIN),adminControllers.updateUserById)


router.get("/properties", authMiddleware(Role.ADMIN),adminControllers.getAllProperties)

router.get(
  "/rentals",
  authMiddleware(Role.ADMIN),
  adminControllers.getAdminRentals,
);


export const adminRoutes = router