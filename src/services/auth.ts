import { IUserOutput, UserModel, IUserInput, IUser } from '../models/user';
import bcrypt from 'bcrypt';
import { userRepository } from './../repositories/user'
import { tokenService } from './token';
import { IToken, tokenTypes } from '../models/token';
import { Types } from 'mongoose';
import { BadTokenError, NotFoundError, DbTokenError, AuthFailureError } from '../models/api-error';
class AuthService {
    async signup(payload: IUserInput): Promise<IUser> {
        const existingUser = await userRepository.getByEmail(payload.email || '');
        if (existingUser) {
            throw new AuthFailureError('User with this email already exists');
        }
        payload.password = bcrypt.hashSync(payload.password as string, 10);
        const user = await userRepository.create(payload);

        return user;
    }

    async login(email: string, password: string): Promise<IUser> {
        const existingUser = await userRepository.getByEmail(email);
        if (!existingUser || await bcrypt.compare(password, existingUser.password) == false) {
            throw new AuthFailureError('Incorrect email and password combination');
        }
        return existingUser;
    }

    async getUserById(id: Types.ObjectId): Promise<IUser> {
        const user = await userRepository.getById(id);
        if (!user) {
            throw new NotFoundError('User Not Found');
        }
        return user;
    }

    async logout(refreshToken: string): Promise<void> {
        const delCount = await tokenService.deleteDBToken(refreshToken)
        if (delCount < 1) {
            throw new DbTokenError();
        }
    }

    async refresh(refreshToken: string): Promise<IUser> {
        const payload = tokenService.verifyJWTToken(refreshToken);
        if (!payload) {
            throw new BadTokenError();
        }
        const dbToken = await tokenService.getToken(refreshToken);
        if (!dbToken) {
            throw new DbTokenError();
        }
        const user = await this.getUserById(dbToken.userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        const delCount = await tokenService.deleteDBToken(refreshToken);
        if (delCount < 1) {
            throw new DbTokenError();
        }
        return user;
    }
}

export const authService = new AuthService();
