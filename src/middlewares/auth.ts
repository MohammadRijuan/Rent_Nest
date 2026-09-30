import type { NextFunction, Request, Response } from "express";
import type { Role } from "../../generated/prisma/enums";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import type { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";



// it will need (getMyProfile) controller.... for getting user....
declare global {
  namespace Express {
    interface Request {
        user?: {
        id: string;
        name: string;
        email: string;
        role: Role;
      };
    }
  }
}




export const authMiddleware = (...RequiredRoles : Role[]) =>{

    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

        const token =
        req.cookies.accessToken ? req.cookies.accessToken : 
        req.headers.authorization?.startsWith("Bearer") 
        ? req.headers.authorization?.split(" ")[1]
        : req.headers.authorization;


        if(!token){
            throw new Error("You are not logged in... Please login to access this resource");
        }


        const verifiedToken = jwtUtils.verifyToken(
            token,
            config.jwt_access_secret
        );


        if(!verifiedToken.success){
            throw new Error(verifiedToken.error)
        }

        const {id,name,email,role} = verifiedToken.data as JwtPayload;

        if(RequiredRoles.length && !RequiredRoles.includes(role)) {
            throw new Error("Forbidden !!! You Donot have permission to access this resource")
        }


        const user = await prisma.user.findUnique({
            where : {
                id,
                name,
                email,
                role
            }
        });


        if(!user){
            throw new Error("User not found ... Please Login Again")
        }

        if(user.activeStatus === "BLOCKED"){
            throw new Error("Your account has been blocked..Please contact support")
        }


        req.user = {
            id,
            name,
            email,
            role
        }

        next()



    })
}





