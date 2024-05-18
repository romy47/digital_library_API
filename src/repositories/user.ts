import IUserInput from "../models/user";
import IUser, { IUserDoc, UserModel } from "../models/user";

class UserRepository {
    async create(user: IUserInput): Promise<IUserDoc> {
        return UserModel.create(user);
    }

    async getByEmail(email: string): Promise<IUserDoc | null> {
        return UserModel.findOne({
            email
        });
    }
}

export const userRepository = new UserRepository();
