"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentsController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const payment_service_1 = require("./payment.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const createPayment = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const result = await payment_service_1.paymentsServices.createPaymentService(req.body, req.user.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Payment session created successfully",
        data: result,
    });
});
const confirmPayment = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    // for checking the val_id
    // console.log("===== SSLCOMMERZ CALLBACK =====");
    // console.log(req.body);
    const payload = req.body;
    const result = await payment_service_1.paymentsServices.confirmPaymentService(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Payment confirmed successfully",
        data: result,
    });
});
const getPayments = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const userId = req.user?.id;
    const result = await payment_service_1.paymentsServices.getPaymentsService(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All Payments fetched successfully",
        data: result,
    });
});
const getPaymentById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const paymentId = req.params.id;
    const userId = req.user?.id;
    const result = await payment_service_1.paymentsServices.getPaymentByIdService(paymentId, userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Payment fetched successfully",
        data: result,
    });
});
exports.paymentsController = {
    createPayment,
    confirmPayment,
    getPayments,
    getPaymentById,
};
//# sourceMappingURL=payment.controller.js.map