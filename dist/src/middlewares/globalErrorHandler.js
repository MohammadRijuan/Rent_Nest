"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.golbalErrorHandler = void 0;
const http_status_1 = __importDefault(require("http-status"));
const client_1 = require("../../generated/prisma/client");
const golbalErrorHandler = (err, req, res, next) => {
    console.log("Error : ", err);
    let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
    let errorMessage = err.message || "Internal Server Error";
    let errorName = err.name || "Internal Server Error";
    let errorDetails = err.stack;
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        const statusCode = http_status_1.default.BAD_REQUEST;
        const errorMessage = "You have provided incorrect field type or missing fields";
    }
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            const statusCode = http_status_1.default.BAD_REQUEST;
            const errorMessage = "Duplicate key error";
        }
        else if (err.code === "P2003") {
            const statusCode = http_status_1.default.BAD_REQUEST;
            const errorMessage = "Foreign constraint failed";
        }
        else if (err.code === "P2025") {
            const statusCode = http_status_1.default.BAD_REQUEST;
            const errorMessage = "An operation failed because it depends on one or more records that were required but not found";
        }
    }
    else if (err instanceof client_1.Prisma.PrismaClientInitializationError) {
        if (err.errorCode === "P1000") {
            const statusCode = http_status_1.default.UNAUTHORIZED;
            const errorMessage = "Authentication failed..Please check your credentials";
        }
        else if (err.errorCode === "P1001") {
            const statusCode = http_status_1.default.BAD_REQUEST;
            const errorMessage = "Can't reach database server";
        }
    }
    else if (err instanceof client_1.Prisma.PrismaClientUnknownRequestError) {
        const statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
        const errorMessage = "Error Occured during query execution";
    }
    res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: statusCode || http_status_1.default.INTERNAL_SERVER_ERROR,
        name: errorName,
        message: errorMessage,
        error: errorDetails,
    });
};
exports.golbalErrorHandler = golbalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map