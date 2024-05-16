import { Request, Response, NextFunction } from "express";
import { userService } from './../services/auth'

class AuthController {
    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        const user = await userService.CreateUser(req.body)
        res.status(200).send({
            message: 'New User Created',
            user: user
        });
    }
}

export const authController = new AuthController();
