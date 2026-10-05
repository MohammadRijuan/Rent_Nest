"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryServices = void 0;
const prisma_1 = require("../../lib/prisma");
const createCategory = async (payload, userId) => {
    const user = await prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
    });
    if (user.activeStatus !== "ACTIVE" || user.role === "TENANT") {
        throw new Error("You are not eligible for creating category");
    }
    const categoryName = payload.name.trim().toLocaleLowerCase();
    //   checking empty
    if (!categoryName) {
        throw new Error("Category name is required");
    }
    //   letter limit
    if (categoryName.length > 50) {
        throw new Error("Category name cannot exceed 50 characters");
    }
    if (payload.description.trim().length > 500) {
        throw new Error("Description cannot exceed 500 characters");
    }
    // checking duplicate
    const isExistCategory = await prisma_1.prisma.category.findUnique({
        where: {
            name: categoryName,
        },
    });
    if (isExistCategory) {
        throw new Error("This category already exist");
    }
    // if not then create a category
    const result = await prisma_1.prisma.category.create({
        data: {
            ...payload,
            name: categoryName,
            author_id: userId,
        },
    });
    return result;
};
exports.categoryServices = {
    createCategory,
};
//# sourceMappingURL=category.service.js.map