import { Request, Response, NextFunction } from "express";
import { authService } from './../services/auth'
import { tokenService } from './../services/token'
import { IUserDoc } from "../models/user";

class AuthController {
    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        const user = await authService.signup({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        })
        res.status(200).send({
            message: 'New User Created',
            user: user.response()
        });
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const user = await authService.login(req.body.email, req.body.password);
        const accessAndRefreshToken = await tokenService.generateTokens(user);
        res.status(200).send({
            message: 'Login Successful',
            user: user,
            tokens: accessAndRefreshToken
        });
    }
}

export const authController = new AuthController();
