import { Schema, Types, model } from "mongoose";

export default interface IToken {
    _id: Types.ObjectId;
    token: string;
    userId: string;
    type: string;
    expires: Date;
    valid: Boolean;
    createdAt: Date;
    updatedAt: Date;
}

export const tokenTypes = {
    ACCESS: 'access',
    REFRESH: 'refresh',
}

const tokenSchema = new Schema<IToken>(
    {
        token: {
            type: String,
            required: true,
            index: true,
        },
        userId: {
            type: String,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            enum: [tokenTypes.ACCESS, tokenTypes.REFRESH],
            required: true,
        },
        expires: {
            type: Date,
            required: true,
        },
        valid: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export const TokenModel = model<IToken>('Token', tokenSchema, 'tokens');
