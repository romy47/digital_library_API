import IUser, { IUserDoc, UserModel } from '../models/user';
import bcrypt from 'bcrypt';
import { userRepository } from './../repositories/user'
import IUserInput from '../models/user';

class AuthService {
    async signup(payload: IUserInput): Promise<IUserDoc> {
        const existingUser = await userRepository.getByEmail(payload.email || '');
        if (existingUser) {
            throw Error('User Exists. Todo: Do better error handling');
        }
        payload.password = bcrypt.hashSync(payload.password as string, 10);
        const user = await userRepository.create(payload);

        return user;
    }

    async login(email: string, password: string): Promise<IUserDoc> {
        console.log(email, password)

        const existingUser = await userRepository.getByEmail(email);
        console.log(existingUser)

        console.log(await bcrypt.compare(password, existingUser ? existingUser.password : ''))
        if (!existingUser || await bcrypt.compare(password, existingUser.password) == false) {
            throw Error('Unauthorized. Todo: Do better error handling');
        }
        return existingUser;
    }
}

export const authService = new AuthService();
