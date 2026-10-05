import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { prisma } from "../lib/prisma";
export const authMiddleware = (...RequiredRoles) => {
    return catchAsync(async (req, res, next) => {
        const token = req.cookies.accessToken ? req.cookies.accessToken :
            req.headers.authorization?.startsWith("Bearer")
                ? req.headers.authorization?.split(" ")[1]
                : req.headers.authorization;
        if (!token) {
            throw new Error("You are not logged in... Please login to access this resource");
        }
        const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);
        if (!verifiedToken.success) {
            throw new Error(verifiedToken.error);
        }
        const { id, name, email, role } = verifiedToken.data;
        if (RequiredRoles.length && !RequiredRoles.includes(role)) {
            throw new Error("Forbidden !!! You Donot have permission to access this resource");
        }
        const user = await prisma.user.findUnique({
            where: {
                id,
                name,
                email,
                role
            }
        });
        if (!user) {
            throw new Error("User not found ... Please Login Again");
        }
        if (user.activeStatus === "BLOCKED") {
            throw new Error("Your account has been blocked..Please contact support");
        }
        req.user = {
            id,
            name,
            email,
            role
        };
        next();
    });
};
//# sourceMappingURL=auth.js.map