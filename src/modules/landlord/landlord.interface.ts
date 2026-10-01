import type { propertyStatus } from "../../../generated/prisma/enums";

export interface ICreatePropertyPayload {
  category_id: string;
  titles: string;
  description: string;
  location: string;
  rent: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string;
  status: propertyStatus;
}


export interface UpdatePropertyPayload {
  category_id?: string;
  titles?: string;
  description?: string;
  location?: string;
  rent?: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string;
  status?: propertyStatus;
}
