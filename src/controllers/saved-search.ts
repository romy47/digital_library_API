import { Response, NextFunction } from "express";
import { SuccessResponse } from "../models/api-response";
import IRequest from "../models/request";
import { searchService } from "../services/search";
import { savedSearchService } from "../services/saved-search";

class SavedSearchController {
    async createSearch(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const searchTerm = req.body.searchTerm;
        const totalDocuments = req.body.totalDocuments;
        const search = await savedSearchService.createSearch(searchTerm, totalDocuments, req.user._id);
        new SuccessResponse('Success', search).send(res);
    }
}

export const savedSearchController = new SavedSearchController();
