import { Request, Response, NextFunction } from "express";
import { authService } from './../services/auth'
import { tokenService } from './../services/token'

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
            user: user.response(),
            tokens: accessAndRefreshToken
        });
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        await authService.logout(req.body.refreshToken);
        res.status(200);
    }

    async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
        const user = await authService.refresh(req.body.refreshToken);
        const accessAndRefreshToken = await tokenService.generateTokens(user);
        res.status(200).send({
            message: 'Refresh Successful',
            user: user.response(),
            tokens: accessAndRefreshToken
        });
    }
}

export const authController = new AuthController();
