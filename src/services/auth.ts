import { IUserOutput, UserModel, IUserInput, IUser } from '../models/user';
import bcrypt from 'bcrypt';
import { userRepository } from './../repositories/user'
import { tokenService } from './token';
import { IToken, tokenTypes } from '../models/token';
import { Types } from 'mongoose';
class AuthService {
    async signup(payload: IUserInput): Promise<IUser> {
        const existingUser = await userRepository.getByEmail(payload.email || '');
        if (existingUser) {
            throw Error('User Exists. Todo: Do better error handling');
        }
        payload.password = bcrypt.hashSync(payload.password as string, 10);
        const user = await userRepository.create(payload);

        return user;
    }

    async login(email: string, password: string): Promise<IUser> {
        const existingUser = await userRepository.getByEmail(email);
        if (!existingUser || await bcrypt.compare(password, existingUser.password) == false) {
            throw Error('Unauthorized. Todo: Do better error handling');
        }
        return existingUser;
    }

    async getUserById(id: Types.ObjectId): Promise<IUser> {
        const user = await userRepository.getById(id);
        if (!user) {
            throw Error('User Not Found. Todo: Do better error handling');
        }
        return user;
    }

    async logout(refreshToken: string): Promise<void> {
        const delCount = await tokenService.deleteDBToken(refreshToken)
        if (delCount < 1) {
            throw Error('Refresh Token Not Found. Todo: Do better error handling');
        }
    }

    async refresh(refreshToken: string): Promise<IUser> {
        const payload = tokenService.verifyJWTToken(refreshToken);
        if (!payload) {
            throw Error('Invalid Token. Todo: Do better error handling');
        }
        const dbToken = await tokenService.getToken(refreshToken);
        if (!dbToken) {
            throw Error('Invalid Token. Todo: Do better error handling');
        }

        const user = await this.getUserById(dbToken.userId);
        if (!user) {
            throw Error('User Not Found. Todo: Do better error handling');
        }
        const delCount = await tokenService.deleteDBToken(refreshToken);
        if (delCount < 1) {
            throw Error('Refresh Token Not Found. Todo: Do better error handling');
        }
        return user;
    }
}

export const authService = new AuthService();
