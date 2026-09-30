import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import type { ILoginUserPayload,RegisterUserPayload } from "./auth.interface";
import { jwtUtils } from "../../utils/jwt";
import type { JwtPayload, SignOptions } from "jsonwebtoken";





const registerUserService = async (payload: RegisterUserPayload) => {
  const { name, email, password, profilePhoto } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // checking user exist with this email
  if (isUserExist) {
    throw new Error("User With this email already exist");
  }


  //   hashed password
  const hashedPassword = await bcrypt.hash(password,Number(config.bcrypt_salt_rounds))


  // if not exist then create a new account
  const createUser = await prisma.user.create({
    data: {
      name,
      email,
      password : hashedPassword,
      profile: {
        create: {
          profilePhoto: profilePhoto ?? null,
        },
      },
    },
  });

  

  //    created one
  const user = await prisma.user.findUnique({
    where: {
      id: createUser.id,
      email: createUser.email || email,
    },
    // omit means remove from response
    omit: {
      password: true, // will not show it in response
    },
    include: {
      profile: true,
    },
  });

  return user;
};






const loginUserService = async(payload:ILoginUserPayload) => {
  
  const {email,password} = payload

  const user = await prisma.user.findUniqueOrThrow({
    where:{
      email
    }
  })

  if(user.activeStatus === "BLOCKED"){
    throw new Error("Your account has been blocked... Please Contact Support")
  }

  const isPasswordMatched = await bcrypt.compare(password,user.password);

  if(!isPasswordMatched){
    throw new Error("Password is incorrect");
  }

  const jwtPayload = {
    id : user.id,
    name:user.name,
    email:user.email,
    role:user.role
  }

   
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions

  )


  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions
  )



  return {
    accessToken,
    refreshToken
  }


};



const refreshToken = async(refreshToken:string)=>{

  const verifiedRefreshToken = jwtUtils.verifyToken(refreshToken,config.jwt_refresh_secret)


  if(!verifiedRefreshToken.success){
    throw new Error(verifiedRefreshToken.error)
  }

  const {id} = verifiedRefreshToken.data as JwtPayload;


  const user = await prisma.user.findUniqueOrThrow({
    where : {
      id
    }
  })


  if (user.activeStatus === "BLOCKED"){
    throw new Error("User is blocked")
  }


  const jwtPayload = {
    id ,
    name : user.name,
    email : user.email,
    role : user.role
  }



  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions
  )


  return {
    accessToken
  }

}



const getMyProfileService = async(userId : string) =>{

  const user = await prisma.user.findUnique({
    where : {
      id :userId
    },
    omit : {
      password:true,
    },
    include:{
      profile:true
    }
  })


  return user

}



export const authServices = {
  registerUserService,
  loginUserService,
  refreshToken,
  getMyProfileService
};
