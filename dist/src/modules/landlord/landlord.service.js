"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.landlordServices = void 0;
const prisma_1 = require("../../lib/prisma");
const createPropertyService = async (payload, userId) => {
    const user = await prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
    });
    if (user.activeStatus !== "ACTIVE" || user.role !== "LANDLORD") {
        throw new Error("You are not eligible for creating a property list");
    }
    const result = await prisma_1.prisma.property.create({
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
const updatePropertyService = async (payload, userId) => {
    const property = await prisma_1.prisma.property.update({
        where: {
            id: userId,
        },
        data: payload,
    });
    return property;
};
// delete property
const deletePropertyService = async (userId) => {
    const property = await prisma_1.prisma.property.delete({
        where: {
            id: userId,
        },
    });
    return property;
};
// to get all requests
const getAllHisRentalRequService = async (userId) => {
    const AllRentalRequ = await prisma_1.prisma.rental.findMany({
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
const updateRentalRequestService = async (userId, rentalId, status) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user ||
        user.activeStatus === "BLOCKED" ||
        (user.role !== "LANDLORD" && user.role !== "ADMIN")) {
        throw new Error("You are not authenticated");
    }
    const rentalRequExist = await prisma_1.prisma.rental.findFirst({
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
    const updateRental = await prisma_1.prisma.rental.update({
        where: {
            id: rentalId,
        },
        data: {
            status,
        },
    });
    return updateRental;
};
exports.landlordServices = {
    createPropertyService,
    updatePropertyService,
    deletePropertyService,
    getAllHisRentalRequService,
    updateRentalRequestService,
};
//# sourceMappingURL=landlord.service.js.map