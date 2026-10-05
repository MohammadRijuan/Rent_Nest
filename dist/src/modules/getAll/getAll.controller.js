import { catchAsync } from "../../utils/catchAsync";
import { getAllServices } from "./getAll.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const getAllCategory = catchAsync(async (req, res, next) => {
    const result = await getAllServices.getAllCategoryService();
    sendResponse(res, {
        success: true,
        message: "Categories retrieved successfully",
        statusCode: httpStatus.OK,
        data: result,
    });
});
// const getAllProperties = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const result = await getAllServices.getAllPropertiesService();
//     sendResponse(res, {
//       success: true,
//       statusCode: httpStatus.OK,
//       message: "All properties retrieved successfully",
//       data: result,
//     });
//   },
// );
// way of getting all property with filter
const getAllProperties = catchAsync(async (req, res, next) => {
    const result = await getAllServices.getAllPropertiesService(req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All properties retrieved successfully",
        data: result,
    });
});
// getting property by id
const getPropertyById = catchAsync(async (req, res, next) => {
    const propertyId = req.params.id;
    if (!propertyId) {
        throw new Error("property id required in params");
    }
    const result = await getAllServices.getPropertyByIdService(propertyId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: " single property retrieved successfully",
        data: result,
    });
});
// renatls
const createRentals = catchAsync(async (req, res, next) => {
    const userId = req.user?.id;
    const payload = req.body;
    const rental = await getAllServices.createRentalService(payload, userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental request created successfully",
        data: rental,
    });
});
const getRentals = catchAsync(async (req, res, next) => {
    // const payload = req.body
    const allRentals = await getAllServices.getRentalsService();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All rental fetched successfully",
        data: allRentals,
    });
});
// create review
const createReview = catchAsync(async (req, res) => {
    const payload = req.body;
    const userId = req.user?.id;
    const result = await getAllServices.createReviewService(payload, userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Review created successfully",
        data: result,
    });
});
export const getAllControllers = {
    getAllCategory,
    getAllProperties,
    getPropertyById,
    createRentals,
    getRentals,
    createReview,
};
//# sourceMappingURL=getAll.controller.js.map