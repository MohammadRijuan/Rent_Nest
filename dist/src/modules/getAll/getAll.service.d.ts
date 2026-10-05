import type { CreateReviewPayload, RentalPayload } from "./getAll.interface";
declare const getAllCategoryService: () => Promise<{
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}[]>;
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
        reviews: {
            comment: string;
        }[];
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
declare const getPropertyByIdService: (propertyId: string) => Promise<{
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
}>;
declare const createRentalService: (payload: RentalPayload, userId: string) => Promise<{
    payments: {
        status: import("../../../generated/prisma/enums").PaymentStatus;
    }[];
    property: {
        titles: string;
    };
} & {
    id: string;
    tenant_id: string;
    property_id: string;
    move_in_date: Date;
    message: string;
    status: import("../../../generated/prisma/enums").RentalStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getRentalsService: () => Promise<({
    payments: {
        status: import("../../../generated/prisma/enums").PaymentStatus;
    }[];
    property: {
        id: string;
        titles: string;
    };
    tenant: {
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
declare const createReviewService: (payload: CreateReviewPayload, userId: string) => Promise<{
    property: {
        id: string;
        location: string;
        titles: string;
    };
    tenant: {
        id: string;
        name: string;
    };
} & {
    id: string;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getAllServices: {
    getAllCategoryService: typeof getAllCategoryService;
    getAllPropertiesService: typeof getAllPropertiesService;
    getPropertyByIdService: typeof getPropertyByIdService;
    createRentalService: typeof createRentalService;
    getRentalsService: typeof getRentalsService;
    createReviewService: typeof createReviewService;
};
export {};
//# sourceMappingURL=getAll.service.d.ts.map