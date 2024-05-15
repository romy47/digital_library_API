import { Schema, Types, model } from "mongoose";
import User from "./user-interface";

const userSchema = new Schema<User>(
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

export const UserModel = model<User>('User', userSchema, 'users');
