export declare const PaymentStatus: {
    readonly PENDING: 'PENDING';
    readonly SUCCESS: 'SUCCESS';
    readonly FAILED: 'FAILED';
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const Methods: {
    readonly SSLCOMMERZ: 'SSLCOMMERZ';
    readonly STRIPE: 'STRIPE';
    readonly BKASH: 'BKASH';
};
export type Methods = (typeof Methods)[keyof typeof Methods];
export declare const propertyStatus: {
    readonly AVAILABLE: 'AVAILABLE';
    readonly RENTED: 'RENTED';
};
export type propertyStatus = (typeof propertyStatus)[keyof typeof propertyStatus];
export declare const RentalStatus: {
    readonly PENDING: 'PENDING';
    readonly APPROVED: 'APPROVED';
    readonly CANCELLED: 'CANCELLED';
};
export type RentalStatus = (typeof RentalStatus)[keyof typeof RentalStatus];
export declare const ActiveStatus: {
    readonly ACTIVE: 'ACTIVE';
    readonly BLOCKED: 'BLOCKED';
};
export type ActiveStatus = (typeof ActiveStatus)[keyof typeof ActiveStatus];
export declare const Role: {
    readonly TENANT: 'TENANT';
    readonly LANDLORD: 'LANDLORD';
    readonly ADMIN: 'ADMIN';
};
export type Role = (typeof Role)[keyof typeof Role];
//# sourceMappingURL=enums.d.ts.map