"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const getAll_service_1 = require("./getAll.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const getAllCategory = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const result = await getAll_service_1.getAllServices.getAllCategoryService();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Categories retrieved successfully",
        statusCode: http_status_1.default.OK,
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
const getAllProperties = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const result = await getAll_service_1.getAllServices.getAllPropertiesService(req.query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All properties retrieved successfully",
        data: result,
    });
});
// getting property by id
const getPropertyById = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const propertyId = req.params.id;
    if (!propertyId) {
        throw new Error("property id required in params");
    }
    const result = await getAll_service_1.getAllServices.getPropertyByIdService(propertyId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: " single property retrieved successfully",
        data: result,
    });
});
// renatls
const createRentals = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const userId = req.user?.id;
    const payload = req.body;
    const rental = await getAll_service_1.getAllServices.createRentalService(payload, userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Rental request created successfully",
        data: rental,
    });
});
const getRentals = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    // const payload = req.body
    const allRentals = await getAll_service_1.getAllServices.getRentalsService();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All rental fetched successfully",
        data: allRentals,
    });
});
// get rental by id
const getRentalById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const rentalId = req.params.id;
    const result = await getAll_service_1.getAllServices.getRentalByIdService(rentalId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Rental fetched successfully",
        data: result,
    });
});
// create review
const createReview = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const payload = req.body;
    const userId = req.user?.id;
    const result = await getAll_service_1.getAllServices.createReviewService(payload, userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Review created successfully",
        data: result,
    });
});
exports.getAllControllers = {
    getAllCategory,
    getAllProperties,
    getPropertyById,
    createRentals,
    getRentals,
    getRentalById,
    createReview
};
//# sourceMappingURL=getAll.controller.js.map