"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllServices = void 0;
const prisma_1 = require("../../lib/prisma");
const getAllCategoryService = async () => {
    const result = await prisma_1.prisma.category.findMany({
        orderBy: {
            createdAt: "desc",
        },
        omit: {
            author_id: true,
        },
    });
    return result;
};
const getAllPropertiesService = async (query) => {
    const { location, minPrice, maxPrice, type, page = "1", limit = "10", } = query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const where = {};
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
        prisma_1.prisma.property.findMany({
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
                reviews: {
                    select: {
                        comment: true,
                    },
                },
            },
        }),
        prisma_1.prisma.property.count({
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
const getPropertyByIdService = async (propertyId) => {
    const transactionResult = await prisma_1.prisma.$transaction(async (tx) => {
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
const createRentalService = async (payload, userId) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (user?.activeStatus !== "ACTIVE" || user.role !== "TENANT") {
        throw new Error("You cannot create a rental request");
    }
    const { property_id, move_in_date, message } = payload;
    // create rental
    const rentalRequ = await prisma_1.prisma.rental.create({
        data: {
            tenant_id: userId,
            property_id,
            move_in_date,
            message,
        },
        include: {
            property: {
                select: {
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
    return rentalRequ;
};
// get all rental request
const getRentalsService = async () => {
    const allRentals = await prisma_1.prisma.rental.findMany({
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
    return allRentals;
};
// create review
const createReviewService = async (payload, userId) => {
    const { property_id, comment } = payload;
    const rentalRequ = await prisma_1.prisma.rental.findFirst({
        where: {
            tenant_id: userId,
            property_id,
            status: "APPROVED",
            payments: {
                some: {
                    status: "SUCCESS",
                },
            },
        },
    });
    if (!rentalRequ) {
        throw new Error("You can review property only after completing payment");
    }
    // checking current user have any comment of this property
    const existingReview = await prisma_1.prisma.reviews.findUnique({
        where: {
            tenant_id_property_id: {
                tenant_id: userId,
                property_id,
            },
        },
    });
    if (existingReview) {
        throw new Error("You already reviewed this property");
    }
    const review = await prisma_1.prisma.reviews.create({
        data: {
            tenant_id: userId,
            property_id,
            comment,
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
                },
            },
            property: {
                select: {
                    id: true,
                    titles: true,
                    location: true,
                },
            },
        },
    });
    return review;
};
exports.getAllServices = {
    getAllCategoryService,
    getAllPropertiesService,
    getPropertyByIdService,
    createRentalService,
    getRentalsService,
    createReviewService,
};
//# sourceMappingURL=getAll.service.js.map