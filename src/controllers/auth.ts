import { Request, Response, NextFunction } from "express";
import { authService } from './../services/auth'
import { tokenService } from './../services/token'
import { SuccessResponse } from "../models/api-response";

class AuthController {
    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        const user = await authService.signup({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        })
        new SuccessResponse('New User Created', { user: user.response() }).send(res);
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const user = await authService.login(req.body.email, req.body.password);
        const accessAndRefreshToken = await tokenService.generateTokens(user);
        new SuccessResponse('Login Successful', { user: user.response(), tokens: accessAndRefreshToken }).send(res);
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        await authService.logout(req.body.refreshToken);
        new SuccessResponse('Logout Successful').send(res);
    }

    async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
        const user = await authService.refresh(req.body.refreshToken);
        const accessAndRefreshToken = await tokenService.generateTokens(user);
        new SuccessResponse('Refresh Successful', { user: user.response(), tokens: accessAndRefreshToken }).send(res);
    }
}

export const authController = new AuthController();
