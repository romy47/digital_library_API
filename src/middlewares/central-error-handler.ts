import { NextFunction, Request, Response } from 'express';

function centralErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err)
    return res.sendStatus(500);
};

export default centralErrorHandler;