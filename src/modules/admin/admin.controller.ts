import type { NextFunction, Request, Response } from "express";
import  { catchAsync } from "../../utils/catchAsync";
import { adminServices } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";


const getAlluser = catchAsync(async(req:Request,res:Response,next : NextFunction)=> {

    const userId = req.user?.id

    if (!userId) {
      throw new Error("You are not admin");
    }

    const result = await adminServices.getAllUserService(userId)

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"All users retrieved successfully",
        data:result
    })


})


// update user by id

const updateUserById = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const payload = req.body

    const userId = req.params.id 

    const result = await adminServices.updateUserByIdService(payload,userId as string)

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"update user data successfully",
        data:result
    })

})



const getAllProperties = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const result = await adminServices.getAllPropertiesService(
      req.query as {
        location?: string;
        minPrice?: string;
        maxPrice?: string;
        type?: string;
        page?: string;
        limit?: string;
      }
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All properties retrieved successfully",
      data: result,
    });
  }
);


export const adminControllers = {
    getAlluser,
    getAllProperties,
    updateUserById
}