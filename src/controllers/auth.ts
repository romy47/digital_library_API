import { Request, Response, NextFunction } from "express";

class AuthController {
    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        res.status(200).send({
            message: 'Signup Route and Controller Working!',
        })
    }
}

export const authController = new AuthController();
