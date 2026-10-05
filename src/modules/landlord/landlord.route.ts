import { Router } from "express";
import { landloardController } from "./landlord.controller";
import { authMiddleware } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router()


router.post("/properties",authMiddleware(Role.LANDLORD,Role.ADMIN), landloardController.createProperty)

router.put("/properties/:id", authMiddleware(Role.LANDLORD,Role.ADMIN), landloardController.updateProperty)

router.delete("/properties/:id", authMiddleware(Role.LANDLORD,Role.ADMIN), landloardController.deleteProperty)


router.get("/requests",authMiddleware(Role.LANDLORD,Role.ADMIN), landloardController.getAllHisRentalRequ)


router.patch("/requests/:id",authMiddleware(Role.LANDLORD,Role.ADMIN), landloardController.updateRentalRequest)


export const landlordRoutes = router