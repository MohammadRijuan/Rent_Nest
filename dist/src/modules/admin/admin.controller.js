"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const admin_service_1 = require("./admin.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const getAlluser = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new Error("You are not admin");
    }
    const result = await admin_service_1.adminServices.getAllUserService(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All users retrieved successfully",
        data: result
    });
});
// update user by id
const updateUserById = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const payload = req.body;
    const userId = req.params.id;
    const result = await admin_service_1.adminServices.updateUserByIdService(payload, userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "update user data successfully",
        data: result
    });
});
const getAllProperties = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const result = await admin_service_1.adminServices.getAllPropertiesService(req.query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All properties retrieved successfully",
        data: result,
    });
});
exports.adminControllers = {
    getAlluser,
    getAllProperties,
    updateUserById
};
//# sourceMappingURL=admin.controller.js.map