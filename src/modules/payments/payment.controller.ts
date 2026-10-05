
import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { paymentsServices } from "./payment.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus  from "http-status";

const createPayment = catchAsync(
  async (req: Request, res: Response,next:NextFunction) => {
    const result = await paymentsServices.createPaymentService(
      req.body,
      req.user!.id
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Payment session created successfully",
      data: result,
    });
  }
);


const confirmPayment = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    
    console.log("===== SSLCOMMERZ CALLBACK =====");
    console.log(req.body);

    const payload = req.body;

    const result = await paymentsServices.confirmPaymentService(payload)

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Payment confirmed successfully",
        data:result
    })
})



const getPayments = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const userId = req.user?.id

    const result = await paymentsServices.getPaymentsService(userId as string)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All Payments fetched successfully",
      data: result,
    });
})



const getPaymentById = catchAsync(
  async (req: Request, res: Response) => {

    const paymentId = req.params.id
    const userId = req.user?.id

    const result = await paymentsServices.getPaymentByIdService(
      paymentId as string,
      userId as string
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payment fetched successfully",
      data: result,
    });
  }
);


export const paymentsController = {
  createPayment,
  confirmPayment,
  getPayments,
  getPaymentById
};