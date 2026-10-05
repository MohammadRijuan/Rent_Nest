import { catchAsync } from "../../utils/catchAsync";
import { adminServices } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const getAlluser = catchAsync(async (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new Error("You are not admin");
    }
    const result = await adminServices.getAllUserService(userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All users retrieved successfully",
        data: result
    });
});
// update user by id
const updateUserById = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const userId = req.params.id;
    const result = await adminServices.updateUserByIdService(payload, userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "update user data successfully",
        data: result
    });
});
const getAllProperties = catchAsync(async (req, res, next) => {
    const result = await adminServices.getAllPropertiesService(req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All properties retrieved successfully",
        data: result,
    });
});
export const adminControllers = {
    getAlluser,
    getAllProperties,
    updateUserById
};
//# sourceMappingURL=admin.controller.js.map