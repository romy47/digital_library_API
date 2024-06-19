import { Response, NextFunction } from "express";
import { SuccessResponse } from "../models/api-response";
import IRequest from "../models/request";
import { searchService } from "../services/search";
import { Types } from "mongoose";
import { savedSearchService } from "../services/saved-search";

class SearchController {
    async createSearch(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const searchQuery = req.body.searchQuery;
        const pageOffset = req.body.offset;
        const search = await searchService.createSearch(searchQuery, pageOffset, req.user._id);
        new SuccessResponse('Success', search).send(res);
    }

    async getSearches(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const savedSearches = await searchService.getSearches(req.user._id);
        new SuccessResponse('Success', savedSearches).send(res)
    }

    async deleteSearch(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const searchId = new Types.ObjectId(req.params['searchId']);
        await searchService.deleteSearch(searchId, req.user._id);
        new SuccessResponse('Success').send(res);
    }

    async deleteSearches(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const stringSearchIds = (req.query.searchIds as string).split(',');
        const searchIds = stringSearchIds.map(id => new Types.ObjectId(id));
        const delCount = await searchService.deleteSearches(searchIds, req.user._id);
        new SuccessResponse(`Success: Deleted ${delCount} Queries`).send(res);
    }
}

export const searchController = new SearchController();
