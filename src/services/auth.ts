import IUser, { UserModel } from '../models/user';
import bcrypt from 'bcrypt';
import { userRepository } from './../repositories/user'

class UserService {
    async CreateUser(payload: any): Promise<IUser> {
        const user = new UserModel({
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            password: payload.password
        })
        const existingUser = await userRepository.getByEmail(user.email || '');
        if (!existingUser) {
            console.log('No user found');
        }
        user.password = bcrypt.hashSync(user.password as string, 10);
        return await userRepository.create(user);
    }
}

export const userService = new UserService();
