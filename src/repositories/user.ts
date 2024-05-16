import IUser, { UserModel } from "../models/user";

class UserRepository {
    async create(user: IUser): Promise<IUser> {
        return UserModel.create(user);
    }

    async getByEmail(email: string): Promise<IUser | null> {
        return UserModel.findOne({
            where: { email: email }
        });
    }
}

export const userRepository = new UserRepository();
