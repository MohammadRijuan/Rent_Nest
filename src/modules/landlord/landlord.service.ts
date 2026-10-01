import { prisma } from "../../lib/prisma";
import type { ICreatePropertyPayload, UpdatePropertyPayload } from "./landlord.interface";

const createPropertyService = async (
  payload: ICreatePropertyPayload,
  userId: string,
) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  if (user.activeStatus !== "ACTIVE" || user.role !== "LANDLORD") {
    throw new Error("You are not eligible for creating a property list");
  }

  const result = await prisma.property.create({
    data: {
      ...payload,
      landlord_id: userId,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return result;
};



const updatePropertyService = async(payload:UpdatePropertyPayload,userId : string) =>{

    const property = await prisma.property.update({
        where : {
            id: userId,
        },
        data : payload
    })

    return property

}



// delete property
const deletePropertyService = async(userId : string) =>{

    const property = await prisma.property.delete({
        where :{
            id: userId
        },
    }) 

    return property

}


export const landlordServices = {
  createPropertyService,
  updatePropertyService,
  deletePropertyService
};
