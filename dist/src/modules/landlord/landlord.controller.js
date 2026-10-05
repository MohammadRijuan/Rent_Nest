import { catchAsync } from "../../utils/catchAsync";
import { landlordServices } from "./landlord.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { use } from "react";
const createProperty = catchAsync(async (req, res, next) => {
    const id = req.user?.id;
    const payload = req.body;
    const result = await landlordServices.createPropertyService(payload, id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "property created successfully",
        data: result
    });
});
// update properties
const updateProperty = catchAsync(async (req, res, next) => {
    const propertyId = req.params.id;
    const payload = req.body;
    const result = await landlordServices.updatePropertyService(payload, propertyId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "property updated successfully",
        data: result
    });
});
// delete property 
const deleteProperty = catchAsync(async (req, res, next) => {
    const propertyId = req.params.id;
    const property = await landlordServices.deletePropertyService(propertyId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property deleted successfully",
        data: property
    });
});
// getting all request
const getAllHisRentalRequ = catchAsync(async (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new Error("User not authenticated");
    }
    const AllRentalRequ = await landlordServices.getAllHisRentalRequService(userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental Requests of your properties",
        data: AllRentalRequ
    });
});
// updating rental requ status
const updateRentalRequest = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user?.id;
    if (!userId) {
        throw new Error("You are not authenticated");
    }
    const result = await landlordServices.updateRentalRequestService(userId, id, status);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental request status updated successfully",
        data: result,
    });
});
export const landloardController = {
    createProperty,
    updateProperty,
    deleteProperty,
    getAllHisRentalRequ,
    updateRentalRequest
};
//# sourceMappingURL=landlord.controller.js.map