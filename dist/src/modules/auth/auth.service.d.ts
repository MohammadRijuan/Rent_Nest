import type { ILoginUserPayload, RegisterUserPayload } from "./auth.interface";
declare const registerUserService: (payload: RegisterUserPayload) => Promise<({
    profile: {
        id: string;
        profilePhoto: string | null;
        bio: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    } | null;
} & {
    id: string;
    name: string;
    email: string;
    activeStatus: import("../../../generated/prisma/enums").ActiveStatus;
    role: import("../../../generated/prisma/enums").Role;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
declare const loginUserService: (payload: ILoginUserPayload) => Promise<{
    accessToken: string;
    refreshToken: string;
}>;
declare const refreshToken: (refreshToken: string) => Promise<{
    accessToken: string;
}>;
declare const getMyProfileService: (userId: string) => Promise<({
    profile: {
        id: string;
        profilePhoto: string | null;
        bio: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    } | null;
} & {
    id: string;
    name: string;
    email: string;
    activeStatus: import("../../../generated/prisma/enums").ActiveStatus;
    role: import("../../../generated/prisma/enums").Role;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
export declare const authServices: {
    registerUserService: typeof registerUserService;
    loginUserService: typeof loginUserService;
    refreshToken: typeof refreshToken;
    getMyProfileService: typeof getMyProfileService;
};
export {};
//# sourceMappingURL=auth.service.d.ts.map