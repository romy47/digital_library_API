import { Schema, Types, model } from "mongoose";

export default interface User {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email?: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
