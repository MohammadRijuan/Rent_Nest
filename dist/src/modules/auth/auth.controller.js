"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllers = void 0;
const auth_service_1 = require("./auth.service");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const registerUser = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const payload = req.body;
    const user = await auth_service_1.authServices.registerUserService(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "user registered successfully",
        statusCode: http_status_1.default.CREATED,
        data: {
            user
        }
    });
});
const loginUser = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const payload = req.body;
    const { accessToken, refreshToken } = await auth_service_1.authServices.loginUserService(payload);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User logged in Successfully",
        data: { accessToken, refreshToken }
    });
});
const refreshToken = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const takeRefreshToken = req.cookies.refreshToken;
    const { accessToken } = await auth_service_1.authServices.refreshToken(takeRefreshToken);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Token Refreshed Successfully",
        data: {
            accessToken
        }
    });
});
const getMyProfile = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const { accessToken } = req.cookies;
    // console.log(req.user , "user-requests")
    const profile = await auth_service_1.authServices.getMyProfileService(req.user?.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User profile fetched Successfully",
        data: {
            profile
        }
    });
});
exports.authControllers = {
    registerUser,
    loginUser,
    refreshToken,
    getMyProfile
};
//# sourceMappingURL=auth.controller.js.map