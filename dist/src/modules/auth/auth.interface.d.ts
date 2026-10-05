import type { Role } from "../../../generated/prisma/enums";
export interface RegisterUserPayload {
    name: string;
    email: string;
    password: string;
    role: Role;
    profilePhoto?: string;
}
export interface ILoginUserPayload {
    email: string;
    password: string;
}
//# sourceMappingURL=auth.interface.d.ts.map