import { error } from "node:console";
import { prisma } from "../../lib/prisma";
import type {
  ICreatePropertyPayload,
  UpdatePropertyPayload,
} from "./landlord.interface";

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

const updatePropertyService = async (
  payload: UpdatePropertyPayload,
  userId: string,
) => {
  const property = await prisma.property.update({
    where: {
      id: userId,
    },
    data: payload,
  });

  return property;
};

// delete property
const deletePropertyService = async (userId: string) => {
  const property = await prisma.property.delete({
    where: {
      id: userId,
    },
  });

  return property;
};

// to get all requests
const getAllHisRentalRequService = async (userId: string) => {
  const AllRentalRequ = await prisma.rental.findMany({
    where: {
      property: {
        landlord_id: userId,
      },
    },
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
          name: true,
        },
      },
      property: {
        select: {
          id: true,
          titles: true,
        },
      },
      payments: {
        select: {
          status: true,
        },
      },
    },
  });

  return AllRentalRequ;
};

// update rental request status by id
const updateRentalRequestService = async (
  userId: string,
  rentalId: string,
  status: "APPROVED" | "CANCELLED",
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (
    !user ||
    user.activeStatus === "BLOCKED" ||
    (user.role !== "LANDLORD" && user.role !== "ADMIN")
  ) {
    throw new Error("You are not authenticated");
  }

  const rentalRequExist = await prisma.rental.findFirst({
    where: {
      id: rentalId,
      property: {
        landlord_id: userId,
      },
    },
  });

  if (!rentalRequExist) {
    throw new Error("Rental request not found");
  }

  const updateRental = await prisma.rental.update({
    where: {
      id: rentalId,
    },
    data: {
      status,
    },
  });

  return updateRental;
};

export const landlordServices = {
  createPropertyService,
  updatePropertyService,
  deletePropertyService,
  getAllHisRentalRequService,
  updateRentalRequestService,
};
