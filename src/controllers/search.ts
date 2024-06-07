import { Response, NextFunction } from "express";
import { SuccessResponse } from "../models/api-response";
import IRequest from "../models/request";
import { searchService } from "../services/search";

class SearchController {
    async createSearch(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const searchTerm = req.body.searchTerm;
        const pageOffset = req.body.offset;
        const search = await searchService.createSearch(searchTerm, pageOffset, req.user._id);
        new SuccessResponse('Success', search).send(res);
    }

    async getSearches(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const savedSearches = await searchService.getSearches(req.user._id);
        new SuccessResponse('Success', savedSearches).send(res)
    }
}

export const searchController = new SearchController();
