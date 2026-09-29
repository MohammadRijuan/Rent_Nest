import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import type RegisterUserPayload from "./auth.interface";
import config from "../../config";

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

const loginUserService = () => {};

export const authServices = {
  registerUserService,
  loginUserService,
};
