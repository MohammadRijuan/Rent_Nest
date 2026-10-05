import type { RentalStatus } from "../../../generated/prisma/enums";
export interface RentalPayload {
    property_id: string;
    move_in_date: Date;
    message: string;
}
export interface AllRentalPayload {
    tenant_id?: string;
    property_id?: string;
    move_in_date?: Date;
    message?: string;
    status?: RentalStatus;
}
export interface CreateReviewPayload {
    property_id: string;
    comment: string;
}
//# sourceMappingURL=getAll.interface.d.ts.map