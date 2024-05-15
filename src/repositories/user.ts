import { UserModel } from "../models/user-model";
import User from "../models/user-interface";

class UserRepository {
    async create(user: User): Promise<User> {
        return UserModel.create(user);
    }

    async getByEmail(email: string): Promise<User | null> {
        return UserModel.findOne({
            where: { email: email }
        });
    }
}

export const userRepository = new UserRepository();
