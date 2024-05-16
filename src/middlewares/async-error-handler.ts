import { Request, Response, NextFunction } from 'express';

function catchAsyncError(fn: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
}
export default catchAsyncError;