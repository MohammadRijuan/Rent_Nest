import type { UpdateUser } from "./admin.interface";
declare const getAllUserService: (userId: string) => Promise<{
    id: string;
    name: string;
    email: string;
    activeStatus: import("../../../generated/prisma/enums").ActiveStatus;
    role: import("../../../generated/prisma/enums").Role;
    createdAt: Date;
    updatedAt: Date;
}[]>;
declare const updateUserByIdService: (payload: UpdateUser, userId: string) => Promise<{
    id: string;
    name: string;
    email: string;
    password: string;
    activeStatus: import("../../../generated/prisma/enums").ActiveStatus;
    role: import("../../../generated/prisma/enums").Role;
    createdAt: Date;
    updatedAt: Date;
}>;
interface IPropertyQuery {
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    type?: string;
    page?: string;
    limit?: string;
}
declare const getAllPropertiesService: (query: IPropertyQuery) => Promise<{
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
    data: ({
        category: {
            name: string;
        };
    } & {
        id: string;
        landlord_id: string;
        category_id: string;
        titles: string;
        description: string;
        location: string;
        rent: import("@prisma/client-runtime-utils").Decimal;
        bedrooms: number;
        bathrooms: number;
        amenities: string;
        status: import("../../../generated/prisma/enums").propertyStatus;
        createdAt: Date;
        updatedAt: Date;
    })[];
}>;
export declare const adminServices: {
    getAllUserService: typeof getAllUserService;
    getAllPropertiesService: typeof getAllPropertiesService;
    updateUserByIdService: typeof updateUserByIdService;
};
export {};
//# sourceMappingURL=admin.service.d.ts.map