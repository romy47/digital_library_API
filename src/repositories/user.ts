import { UserModel, IUserInput, IUser } from "../models/user";
import { Types } from 'mongoose';

class UserRepository {
    async create(user: IUserInput): Promise<IUser> {
        return UserModel.create(user);
    }

    async getByEmail(email: string): Promise<IUser | null> {
        return UserModel.findOne({
            email
        });
    }

    async getById(id: Types.ObjectId): Promise<IUser | null> {
        return UserModel.findById(id);
    }

}

export const userRepository = new UserRepository();
