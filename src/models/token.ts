import { JwtPayload } from "jsonwebtoken";
import { Schema, Types, model } from "mongoose";

export interface IToken {
    _id: Types.ObjectId;
    token: string;
    userId: Types.ObjectId;
    type: string;
    expires: Date;
    valid: Boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ITokenInput extends Omit<IToken, '_id' | 'createdAt' | 'updatedAt'> {
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
            type: Schema.Types.ObjectId,
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
