import { Request, Response, NextFunction } from "express";
import { authService } from '../services/auth'
import { tokenService } from '../services/token'
import { SuccessResponse } from "../models/api-response";
import { documentService } from "../services/document";
import IRequest from "../models/request";

class DocumentController {
    async getSavedDocuments(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const documents = await documentService.getSavedDocuments(req.user._id);
        new SuccessResponse('Success', documents).send(res)
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

export const documentController = new DocumentController();
