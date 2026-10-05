import type { NextFunction, Request, Response } from "express";
export declare const getAllControllers: {
    getAllCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllProperties: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPropertyById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createRentals: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getRentals: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createReview: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=getAll.controller.d.ts.map