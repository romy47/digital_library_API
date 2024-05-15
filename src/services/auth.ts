import User from '../models/user-interface';
import bcrypt from 'bcrypt';
import { userRepository } from './../repositories/user'

class UserService {
    async CreateUser(payload: any): Promise<User> {
        console.log(payload)
        const userObj: User = {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            password: payload.password
        } as User;
        const user = await userRepository.getByEmail(userObj.email || '');
        if (!user) {
            console.log('No user found');
        }
        console.log(userObj)
        userObj.password = bcrypt.hashSync(userObj.password as string, 10);
        return await userRepository.create(userObj);
    }
}

export const userService = new UserService();
