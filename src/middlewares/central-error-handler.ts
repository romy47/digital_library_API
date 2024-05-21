import { NextFunction, Request, Response } from 'express';
import { ApiError, InternalError } from '../models/api-error';

function centralErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err)
    if (err instanceof ApiError) {
        ApiError.processError(err, res);
    } else {
        ApiError.processError(new InternalError(), res);
    }
    //Todo: Implement Logger Service
};

export default centralErrorHandler;