import { Request, Response, NextFunction } from "express";
import { DefaultConfig } from "../config";
import jwt from 'jsonwebtoken';
import { JWTClaim, tokenService } from "../services/token";
import { authService } from './../services/auth'
import IRequest from "../models/request";
import { Types } from 'mongoose';
import { BadTokenError, AuthTokenExpiredError } from "../models/api-error";
export default async function restricted(req: IRequest, res: Response, next: NextFunction): Promise<void> {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader || !(tokenHeader.split(' ')[0] === 'Bearer')) {
        throw new BadTokenError();
    }
    const token = String(tokenHeader.split(' ')[1]);
    const payload = tokenService.verifyJWTToken(token);
    if (!payload) {
        throw new BadTokenError();
    }
    const user = await authService.getUserById(new Types.ObjectId(payload.sub));
    req.user = user;
    next();
}   