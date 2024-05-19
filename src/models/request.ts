import { Request, Response, NextFunction } from "express";
import { IUser } from "./user";

export default interface IRequest extends Request {
    user: IUser
}
