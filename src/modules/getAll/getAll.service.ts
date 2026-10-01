import { prisma } from "../../lib/prisma";
import type { AllRentalPayload, RentalPayload } from "./getAll.interface";

const getAllCategoryService = async () => {
  const result = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    omit: {
      author_id: true,
    },
  });
  return result;
};


// way of getting all property without filter

// const getAllPropertiesService = async () => {

//   const result = await prisma.property.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },
//     include: {
//       category: {
//         select: {
//           name: true,
//         },
//       },
//     },
//   });

//   return result;
// };

// property get by id



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


// property filter by id 

const getPropertyByIdService = async (propertyId: string) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    // if we want views then we have to update schema with views field

    // await tx.property.update({
    //     where : {
    //         id : propertyId,
    //     },
    //     data:{
    //         views : {
    //             increment : 1,
    //         }
    //     }
    // });

    const property = await tx.property.findUniqueOrThrow({
      where: {
        id: propertyId,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    return property;
  });

  return transactionResult;
};



// create rentals service
const createRentalService = async(payload:RentalPayload,userId:string)=>{

    const user = await prisma.user.findUnique({
        where : {
            id:userId
        }
    });


    if(user?.activeStatus !== "ACTIVE" || user.role !== "TENANT"){
        throw new Error("You cannot create a rental request")
    }

    const {property_id,move_in_date,message} = payload

    // create rental
    const rentalRequ = await prisma.rental.create({
        data:{
            tenant_id : userId,
            property_id,
            move_in_date,
            message,

        },
        include:{
            property:{
                select:{
                    titles:true,
                }
            },
            payments:{
              select:{
                status : true  
              }
            },
            profile :{
                select:{
                    name:true
                }
            }
        }

    });


    return rentalRequ

}


// get all rental request
const getRentalsService = async()=>{

    const allRentals = await prisma.rental.findMany({
        orderBy:{
            createdAt:"desc"
        },
        omit:{
            tenant_id:true,
            property_id:true
        },
        include:{
            tenant :{
                select:{
                    id:true,
                   name:true
                }
            },
            property:{
                select:{
                    id:true,
                    titles:true
                }
            }
        }
    })

    return allRentals

}



export const getAllServices = {
  getAllCategoryService,
  getAllPropertiesService,
  getPropertyByIdService,
  createRentalService,
  getRentalsService
};
