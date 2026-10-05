"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const jwt_1 = require("../utils/jwt");
const config_1 = __importDefault(require("../config"));
const prisma_1 = require("../lib/prisma");
const authMiddleware = (...RequiredRoles) => {
    return (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const token = req.cookies.accessToken ? req.cookies.accessToken :
            req.headers.authorization?.startsWith("Bearer")
                ? req.headers.authorization?.split(" ")[1]
                : req.headers.authorization;
        if (!token) {
            throw new Error("You are not logged in... Please login to access this resource");
        }
        const verifiedToken = jwt_1.jwtUtils.verifyToken(token, config_1.default.jwt_access_secret);
        if (!verifiedToken.success) {
            throw new Error(verifiedToken.error);
        }
        const { id, name, email, role } = verifiedToken.data;
        if (RequiredRoles.length && !RequiredRoles.includes(role)) {
            throw new Error("Forbidden !!! You Donot have permission to access this resource");
        }
        const user = await prisma_1.prisma.user.findUnique({
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
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map