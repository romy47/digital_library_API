import { Response } from 'express';
import { BadRequestResponse, ForbiddenResponse, InternalErrorResponse, NotFoundResponse, UnAuthorizedResponse } from './api-response';
import { DefaultConfig, EnvironmentType } from '../config';

export enum ErrorType {
    BAD_TOKEN = 'BadTokenError',
    TOKEN_EXPIRED = 'TokenExpiredError',
    UNAUTHORIZED = 'AuthFailureError',
    INTERNAL = 'InternalError',
    NOT_FOUND = 'NotFoundError',
    BAD_REQUEST = 'BadRequestError',
    FORBIDDEN = 'ForbiddenError',
}

export abstract class ApiError extends Error {
    protected type: ErrorType
    constructor(type: ErrorType, message = 'Error Occured') {
        super(message);
        this.type = type;
        if (!this.stack) {
            Error.captureStackTrace(this, this.constructor)
        }
    }

    public static processError(err: ApiError, res: Response): Response {
        let stackTraceData;
        if (DefaultConfig.environment === EnvironmentType.DEVELOP) {
            stackTraceData = { stackTrace: err.stack }
        }
        switch (err.type) {
            case ErrorType.BAD_TOKEN:
            case ErrorType.TOKEN_EXPIRED:
            case ErrorType.UNAUTHORIZED:
                return new UnAuthorizedResponse(err.message, stackTraceData).send(res);
            case ErrorType.INTERNAL:
                return new InternalErrorResponse(err.message, stackTraceData).send(res);
            case ErrorType.NOT_FOUND:
                return new NotFoundResponse(err.message).send(res);
            case ErrorType.BAD_REQUEST:
                return new BadRequestResponse(err.message).send(res);
            case ErrorType.FORBIDDEN:
                return new ForbiddenResponse(err.message).send(res);
            default: {
                return new InternalErrorResponse(err.message, stackTraceData).send(res);
            }
        }
    }
}

export class AuthFailureError extends ApiError {
    constructor(message = 'Invalid Credentials') {
        super(ErrorType.UNAUTHORIZED, message);
    }
}

export class InternalError extends ApiError {
    constructor(message = 'Internal error') {
        super(ErrorType.INTERNAL, message);
    }
}

export class BadRequestError extends ApiError {
    constructor(message = 'Bad Request') {
        super(ErrorType.BAD_REQUEST, message);
    }
}

export class NotFoundError extends ApiError {
    constructor(message = 'Not Found') {
        super(ErrorType.NOT_FOUND, message);
    }
}

export class ForbiddenError extends ApiError {
    constructor(message = 'Permission denied') {
        super(ErrorType.FORBIDDEN, message);
    }
}

export class BadTokenError extends ApiError {
    constructor(message = 'Token is not valid or not given') {
        super(ErrorType.BAD_TOKEN, message);
    }
}

export class DbTokenError extends ApiError {
    constructor(message = 'Token not found in DB') {
        super(ErrorType.BAD_TOKEN, message);
    }
}

export class AuthTokenExpiredError extends ApiError {
    constructor(message = 'Token is expired') {
        super(ErrorType.TOKEN_EXPIRED, message);
    }
}
