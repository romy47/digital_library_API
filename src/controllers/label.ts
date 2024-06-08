import { Response, NextFunction } from "express";
import { SuccessResponse } from "../models/api-response";
import IRequest from "../models/request";
import { searchService } from "../services/search";
import { labelService } from "../services/label";

class LabelController {
    async createLabel(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const title = req.body.title;
        const documentIds = req.body.documents;
        const search = await labelService.createLabel(title, documentIds, req.user._id);
        new SuccessResponse('Success', search).send(res);
    }
}

export const labelController = new LabelController();
