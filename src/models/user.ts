import { Schema, Types, model } from "mongoose";

export interface IUser {
    _id: Types.ObjectId
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    response(): IUserOutput;
}

export interface IUserInput extends Omit<IUser, 'createdAt' | 'updatedAt' | 'response' | '_id'> {
}

export interface IUserOutput extends Omit<IUser, 'password' | 'response'> {
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
        timestamps: true,
    },
)

userSchema.method('response', function (): IUserOutput {
    const userObject = this.toObject();
    return {
        email: userObject.email,
        firstName: userObject.firstName,
        lastName: userObject.lastName,
        createdAt: userObject.createdAt,
        updatedAt: userObject.updatedAt,
        _id: userObject._id
    }
})

export const UserModel = model<IUser>('User', userSchema, 'users');

