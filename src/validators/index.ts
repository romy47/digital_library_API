import Joi from "joi";
import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from "../models/api-error";

export enum ValidationSource {
    BODY = 'body',
    HEADER = 'headers',
    QUERY = 'query',
    PARAM = 'params',
}

export function validate(
    schema: Joi.AnySchema,
    source: ValidationSource = ValidationSource.BODY) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.validate(req[source]);
        if (result.error) {
            throw new BadRequestError(result.error.message);
        }
        next();
    }
}