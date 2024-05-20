import { Response } from 'express';

export enum ResponseStatus {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500,
}

abstract class ApiResponse {
    protected status: ResponseStatus
    protected message: string
    protected data?: {}
    constructor(
        status: ResponseStatus,
        message: string,
        data?: {}
    ) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public send(
        res: Response,
    ): Response {
        const result = {
            message: this.message,
            ...this.data && { data: this.data }
        }
        result['data'] = this.data
        return res.status(this.status).json(result);
    }
}

export class UnAuthorizedResponse extends ApiResponse {
    constructor(message = 'Unauthorized Request', data?: {}) {
        super(ResponseStatus.UNAUTHORIZED, message, data);
    }
}

export class NotFoundResponse extends ApiResponse {
    constructor(message = 'Not Found', data?: {}) {
        super(ResponseStatus.NOT_FOUND, message, data);
    }
}

export class ForbiddenResponse extends ApiResponse {
    constructor(message = 'Forbidden', data?: {}) {
        super(ResponseStatus.FORBIDDEN, message, data);
    }
}

export class BadRequestResponse extends ApiResponse {
    constructor(message = 'Bad Request', data?: {}) {
        super(ResponseStatus.BAD_REQUEST, message, data);
    }
}

export class InternalErrorResponse extends ApiResponse {
    constructor(message = 'Internal Error', data?: {}) {
        super(ResponseStatus.INTERNAL_ERROR, message, data);
    }
}

export class SuccessResponse extends ApiResponse {
    constructor(message = 'Success', data?: {}) {
        super(ResponseStatus.SUCCESS, message, data);
    }
}
