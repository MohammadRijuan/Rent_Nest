import { authServices } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const registerUser = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const user = await authServices.registerUserService(payload);
    sendResponse(res, {
        success: true,
        message: "user registered successfully",
        statusCode: httpStatus.CREATED,
        data: {
            user
        }
    });
});
const loginUser = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const { accessToken, refreshToken } = await authServices.loginUserService(payload);
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
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User logged in Successfully",
        data: { accessToken, refreshToken }
    });
});
const refreshToken = catchAsync(async (req, res, next) => {
    const takeRefreshToken = req.cookies.refreshToken;
    const { accessToken } = await authServices.refreshToken(takeRefreshToken);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24
    });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Token Refreshed Successfully",
        data: {
            accessToken
        }
    });
});
const getMyProfile = catchAsync(async (req, res, next) => {
    const { accessToken } = req.cookies;
    // console.log(req.user , "user-requests")
    const profile = await authServices.getMyProfileService(req.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile fetched Successfully",
        data: {
            profile
        }
    });
});
export const authControllers = {
    registerUser,
    loginUser,
    refreshToken,
    getMyProfile
};
//# sourceMappingURL=auth.controller.js.map