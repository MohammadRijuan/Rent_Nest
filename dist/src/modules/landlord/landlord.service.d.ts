import type { ICreatePropertyPayload, UpdatePropertyPayload } from "./landlord.interface";
declare const createPropertyService: (payload: ICreatePropertyPayload, userId: string) => Promise<{
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
declare const updatePropertyService: (payload: UpdatePropertyPayload, userId: string) => Promise<{
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
declare const deletePropertyService: (userId: string) => Promise<{
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
declare const getAllHisRentalRequService: (userId: string) => Promise<({
    payments: {
        status: import("../../../generated/prisma/enums").PaymentStatus;
    }[];
    property: {
        id: string;
        titles: string;
    };
    tenant: {
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
declare const updateRentalRequestService: (userId: string, rentalId: string, status: "APPROVED" | "CANCELLED") => Promise<{
    id: string;
    tenant_id: string;
    property_id: string;
    move_in_date: Date;
    message: string;
    status: import("../../../generated/prisma/enums").RentalStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const landlordServices: {
    createPropertyService: typeof createPropertyService;
    updatePropertyService: typeof updatePropertyService;
    deletePropertyService: typeof deletePropertyService;
    getAllHisRentalRequService: typeof getAllHisRentalRequService;
    updateRentalRequestService: typeof updateRentalRequestService;
};
export {};
//# sourceMappingURL=landlord.service.d.ts.map