import { UserModel, IUser } from '../models/user';
import IAccessAndRefreshTokens from '../models/access-and-refresh-tokens';
import { userRepository } from './../repositories/user'
import { tokenTypes, TokenModel, IToken } from '../models/token';
import jwt, { JwtPayload } from 'jsonwebtoken';
import mongoose, { Types } from 'mongoose';
import { DefaultConfig } from '../config';
import { tokenRepository } from '../repositories/token';

export interface JWTClaim extends JwtPayload {
    sub: string,
    exp: number,
    type: string
}

class TokenService {
    async generateTokens(user: IUser): Promise<IAccessAndRefreshTokens> {
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

        const newRefreshToken = await tokenRepository.create({
            token: refreshToken,
            expires: refreshClaim.exp,
            userId: new Types.ObjectId(refreshClaim.sub),
            type: refreshClaim.type,
            valid: true
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

    async getToken(refreshToken: string, type = tokenTypes.REFRESH, valid = true): Promise<IToken | null> {
        return await tokenRepository.getByToken(
            refreshToken,
            type,
            valid,
        );
    }

    async deleteDBToken(refreshToken: string, type = tokenTypes.REFRESH, valid = true): Promise<number> {
        return await tokenRepository.deleteToken(
            refreshToken,
            type,
        );
    }

    verifyJWTToken(token: string): JWTClaim {
        return jwt.verify(token, DefaultConfig.jwtKey) as JWTClaim
    }
}

export const tokenService = new TokenService();
