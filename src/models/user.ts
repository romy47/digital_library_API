import { Schema, Types, model, Document, Model } from "mongoose";

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export default interface IUserInput extends Omit<IUser, 'createdAt' | 'updatedAt'> {
}

export interface IUserOutput extends Omit<IUser, 'password'> {
}

export interface IUserDoc extends IUser, Document {
    response(): IUserOutput;
}

const userSchema = new Schema<IUserDoc>(
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
    }
})

export const UserModel = model<IUserDoc>('User', userSchema, 'users');

