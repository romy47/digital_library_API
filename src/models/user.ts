import { Schema, Types, model } from "mongoose";

export default interface IUser {
    _id?: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
    {
        firstName: {
            type: Schema.Types.String,
            trim: true,
            maxlength: 50,
        },
        lastName: {
            type: Schema.Types.String,
            trim: true,
            maxlength: 50,
        },
        email: {
            type: Schema.Types.String,
            unique: true,
            trim: true,
        },
        password: {
            type: Schema.Types.String,
            trim: true,
        },
    },
    {
        timestamps: true
    }
);

export const UserModel = model<IUser>('User', userSchema, 'users');
