import type { NextFunction, Request, Response } from "express";
export declare const landloardController: {
    createProperty: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateProperty: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteProperty: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllHisRentalRequ: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateRentalRequest: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=landlord.controller.d.ts.map