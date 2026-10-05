import { Router } from "express";
import { getAllControllers } from "./getAll.controller";
import { authMiddleware } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router()


router.get("/categories",getAllControllers.getAllCategory)

router.get("/properties",getAllControllers.getAllProperties)

router.get("/properties/:id",getAllControllers.getPropertyById)

router.post("/rentals",authMiddleware(Role.TENANT), getAllControllers.createRentals)

router.get("/rentals", getAllControllers.getRentals)

router.post("/reviews",authMiddleware(Role.TENANT), getAllControllers.createReview)


export const getAllRoutes = router