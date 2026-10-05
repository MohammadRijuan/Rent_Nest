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
declare const getAdminRentalsService: (userId: string) => Promise<({
    payments: {
        amount: import("@prisma/client-runtime-utils").Decimal;
        createdAt: Date;
        id: string;
        method: import("../../../generated/prisma/enums").Methods;
        status: import("../../../generated/prisma/enums").PaymentStatus;
        transaction: string | null;
    }[];
    property: {
        category: {
            id: string;
            name: string;
        };
        id: string;
        landlord: {
            email: string;
            id: string;
            name: string;
        };
        location: string;
        rent: import("@prisma/client-runtime-utils").Decimal;
        status: import("../../../generated/prisma/enums").propertyStatus;
        titles: string;
    };
    tenant: {
        email: string;
        id: string;
        name: string;
    };
} & {
    id: string;
    move_in_date: Date;
    message: string;
    status: import("../../../generated/prisma/enums").RentalStatus;
    createdAt: Date;
    updatedAt: Date;
})[]>;
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
    getAdminRentalsService: typeof getAdminRentalsService;
};
export {};
//# sourceMappingURL=admin.service.d.ts.map