import type { CreatePaymentPayload, SSLCommerzCallbackPayload } from "./payment.interface";
declare const createPaymentService: (payload: CreatePaymentPayload, userId: string) => Promise<{
    paymentId: string;
    transactionId: string;
    amount: number;
    gatewayUrl: any;
}>;
declare const confirmPaymentService: (payload: SSLCommerzCallbackPayload) => Promise<{
    id: string;
    rental_id: string;
    tenant_id: string;
    transaction: string | null;
    amount: import("@prisma/client-runtime-utils").Decimal;
    method: import("../../../generated/prisma/enums").Methods;
    status: import("../../../generated/prisma/enums").PaymentStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getPaymentsService: (userId: string) => Promise<({
    rental: {
        id: string;
        property: {
            id: string;
            location: string;
            titles: string;
        };
        status: import("../../../generated/prisma/enums").RentalStatus;
        tenant: {
            id: string;
            name: string;
        };
    };
} & {
    id: string;
    transaction: string | null;
    amount: import("@prisma/client-runtime-utils").Decimal;
    method: import("../../../generated/prisma/enums").Methods;
    status: import("../../../generated/prisma/enums").PaymentStatus;
    createdAt: Date;
    updatedAt: Date;
})[]>;
declare const getPaymentByIdService: (paymentId: string, userId: string) => Promise<{
    rental: {
        id: string;
        property: {
            id: string;
            location: string;
            titles: string;
        };
        status: import("../../../generated/prisma/enums").RentalStatus;
        tenant: {
            id: string;
            name: string;
        };
    };
} & {
    id: string;
    transaction: string | null;
    amount: import("@prisma/client-runtime-utils").Decimal;
    method: import("../../../generated/prisma/enums").Methods;
    status: import("../../../generated/prisma/enums").PaymentStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const paymentsServices: {
    createPaymentService: typeof createPaymentService;
    confirmPaymentService: typeof confirmPaymentService;
    getPaymentsService: typeof getPaymentsService;
    getPaymentByIdService: typeof getPaymentByIdService;
};
export {};
//# sourceMappingURL=payment.service.d.ts.map