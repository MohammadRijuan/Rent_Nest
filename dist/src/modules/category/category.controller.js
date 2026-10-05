"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const category_service_1 = require("./category.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const createCategory = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const id = req.user?.id;
    const payload = req.body;
    const result = await category_service_1.categoryServices.createCategory(payload, id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Category added successfully",
        statusCode: http_status_1.default.CREATED,
        data: result
    });
});
exports.categoryControllers = {
    createCategory,
};
//# sourceMappingURL=category.controller.js.map