import type { Request } from "express";
import type { IAllUsers, UpdateUser } from "./admin.interface";
import { prisma } from "../../lib/prisma";

const getAllUserService = async (userId: string) => {

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  if (user.activeStatus !== "ACTIVE" || user.role !== "ADMIN") {
    throw new Error("sorry you dont have access of this route");
  }

  const result = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    omit :{
        password:true
    }
  });

  return result;
};



// update user by id 

const updateUserByIdService = async(payload:UpdateUser,userId : string) =>{

    const user = await prisma.user.update({
        where : {
            id : userId
        },
        data: payload
    })


    return user

}


// get all rental request by admin
const getAdminRentalsService = async (userId :string) => {
   
  const user = await prisma.user.findUnique({
    where:{
      id :userId
    }
  })

  if(!user || user.role !== "ADMIN"){
    throw new Error("You are not eligible to access this resource")
  }

  const rentals = await prisma.rental.findMany({
    orderBy: {
      createdAt: "desc",
    },
    omit: {
      tenant_id: true,
      property_id: true,
    },
    include: {
      tenant: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

      property: {
        select: {
          id: true,
          titles: true,
          location: true,
          rent: true,
          status: true,
          landlord: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },

      payments: {
        select: {
          id: true,
          transaction: true,
          amount: true,
          method: true,
          status: true,
          createdAt: true,
        },
      },
    },
  });

  return rentals;
};



// way of getting all property with filter including pagination

interface IPropertyQuery {
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  type?: string;
  page?: string;
  limit?: string;
}

const getAllPropertiesService = async (query: IPropertyQuery) => {
  const {
    location,
    minPrice,
    maxPrice,
    type,
    page = "1",
    limit = "10",
  } = query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const skip = (pageNumber - 1) * limitNumber;

  const where: any = {};

  // Location filter
  if (location) {
    where.location = {
      contains: location,
      mode: "insensitive",
    };
  }

  // Price filter
  if (minPrice || maxPrice) {
    where.rent = {};

    if (minPrice) {
        // gte = greater than equal
      where.rent.gte = Number(minPrice);
    }

    if (maxPrice) {
          // lte = lte than equal
      where.rent.lte = Number(maxPrice);
    }
  }

  // Category/type filter
  if (type) {
    where.category = {
      name: {
        equals: type.toLowerCase(),
      },
    };
  }

  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,

      orderBy: {
        createdAt: "desc",
      },

      skip,
      take: limitNumber,

      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    }),

    prisma.property.count({
      where,
    }),
  ]);

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPage: Math.ceil(total / limitNumber),
    },

    data: properties,
  };
};

export const adminServices = {
  getAllUserService,
  getAllPropertiesService,
  updateUserByIdService,
  getAdminRentalsService
};
