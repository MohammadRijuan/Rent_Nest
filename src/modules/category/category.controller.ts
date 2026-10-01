import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { categoryServices } from "./category.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createCategory = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const id = req.user?.id 
    const payload = req.body

    const result = await categoryServices.createCategory(payload,id as string)

    sendResponse(res,{
        success:true,
        message:"Category added successfully",
        statusCode:httpStatus.CREATED,
        data:result
    })
})

export const categoryControllers = {
  createCategory,
};
