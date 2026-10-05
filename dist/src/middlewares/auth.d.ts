import type { NextFunction, Request, Response } from "express";
import type { Role } from "../../generated/prisma/enums";
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                name: string;
                email: string;
                role: Role;
            };
        }
    }
}
export declare const authMiddleware: (...RequiredRoles: Role[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.d.ts.map