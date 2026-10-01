import type { ActiveStatus, Role } from "../../../generated/prisma/enums";

export interface IAllUsers {
    name : string;
    email: string;
    role: Role
}


export interface UpdateUser {
    name ?: string;
    email?: string;
    role?: Role;
    activeStatus ?: ActiveStatus
}