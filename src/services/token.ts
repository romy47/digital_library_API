import IUser, { IUserDoc, UserModel } from '../models/user';
import IAccessAndRefreshTokens from '../models/access-and-refresh-tokens';
import { userRepository } from './../repositories/user'
import IToken, { tokenTypes, TokenModel } from '../models/token';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { DefaultConfig } from '../config';

interface JWTClaim {
    sub: string,
    exp: number,
    type: string
}

class TokenService {
    async generateTokens(user: IUserDoc): Promise<IAccessAndRefreshTokens> {
        const refreshExpires = DefaultConfig.refreshTokenExpiresSeconds;
        const accessToken = this.generateToken({
            sub: user._id.toString(),
            exp: DefaultConfig.accessTokenExpiresSeconds,
            type: tokenTypes.ACCESS
        });

        const refreshClaim = {
            sub: user._id.toString(),
            exp: refreshExpires,
            type: tokenTypes.REFRESH
        } as JWTClaim;

        const refreshToken = this.generateToken(refreshClaim);

        const newRefreshToken = await TokenModel.create({
            token: refreshToken,
            expires: refreshClaim.exp,
            userId: refreshClaim.sub,
            type: refreshClaim.type
        });

        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        } as IAccessAndRefreshTokens;
    }

    generateToken(tokenPayload: JWTClaim): string {
        return jwt.sign(
            tokenPayload,
            DefaultConfig.jwtKey
        )

    }
}

export const tokenService = new TokenService();
