import { catchAsync } from "../../utils/catchAsync";
import { categoryServices } from "./category.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const createCategory = catchAsync(async (req, res, next) => {
    const id = req.user?.id;
    const payload = req.body;
    const result = await categoryServices.createCategory(payload, id);
    sendResponse(res, {
        success: true,
        message: "Category added successfully",
        statusCode: httpStatus.CREATED,
        data: result
    });
});
export const categoryControllers = {
    createCategory,
};
//# sourceMappingURL=category.controller.js.map