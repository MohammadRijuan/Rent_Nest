import type { NextFunction, Request, Response } from "express";
export declare const paymentsController: {
    createPayment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    confirmPayment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPayments: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPaymentById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=payment.controller.d.ts.map