import type { RentalStatus } from "../../../generated/prisma/enums";

export interface RentalPayload{
    property_id : string;
    move_in_date : Date;
    message :string;
}

export interface AllRentalPayload{
    tenant_id ?: string;
    property_id ?: string;
    move_in_date ?: Date;
    message ?:string;
    status ?: RentalStatus;
}


export interface IPropertyQuery {
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  type?: string;
  page?: string;
  limit?: string;
}


export interface CreateReviewPayload {
  property_id: string;
  comment: string;
}