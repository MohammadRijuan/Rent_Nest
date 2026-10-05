"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.landloardController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const landlord_service_1 = require("./landlord.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const createProperty = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const id = req.user?.id;
    const payload = req.body;
    const result = await landlord_service_1.landlordServices.createPropertyService(payload, id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "property created successfully",
        data: result
    });
});
// update properties
const updateProperty = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const propertyId = req.params.id;
    const payload = req.body;
    const result = await landlord_service_1.landlordServices.updatePropertyService(payload, propertyId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "property updated successfully",
        data: result
    });
});
// delete property 
const deleteProperty = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const propertyId = req.params.id;
    const property = await landlord_service_1.landlordServices.deletePropertyService(propertyId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Property deleted successfully",
        data: property
    });
});
// getting all request
const getAllHisRentalRequ = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new Error("User not authenticated");
    }
    const AllRentalRequ = await landlord_service_1.landlordServices.getAllHisRentalRequService(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Rental Requests of your properties",
        data: AllRentalRequ
    });
});
// updating rental requ status
const updateRentalRequest = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user?.id;
    if (!userId) {
        throw new Error("You are not authenticated");
    }
    const result = await landlord_service_1.landlordServices.updateRentalRequestService(userId, id, status);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Rental request status updated successfully",
        data: result,
    });
});
exports.landloardController = {
    createProperty,
    updateProperty,
    deleteProperty,
    getAllHisRentalRequ,
    updateRentalRequest
};
//# sourceMappingURL=landlord.controller.js.map