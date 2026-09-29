import type { NextFunction, Request, Response } from "express"
import { authServices } from "./auth.service"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status"

const registerUser = catchAsync(async(req:Request,res:Response,mext : NextFunction) =>{

    const payload = req.body
    const user = await authServices.registerUserService(payload)

    sendResponse(res,{
        success:true,
        message : "user registered successfully",
        statusCode:httpStatus.OK,
        data : {
            user
        }
    })
})


const loginUser = () =>{

}


export const authControllers = {
    registerUser,
    loginUser

}