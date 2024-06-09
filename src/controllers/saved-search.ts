import { Response, NextFunction } from "express";
import { SuccessResponse } from "../models/api-response";
import IRequest from "../models/request";
import { searchService } from "../services/search";
import { savedSearchService } from "../services/saved-search";
import { Types } from "mongoose";
import { documentService } from "../services/document";

class SavedSearchController {
    async createSearch(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const searchTerm = req.body.searchTerm;
        const totalDocuments = req.body.totalDocuments;
        const search = await savedSearchService.createSearch(searchTerm, totalDocuments, req.user._id);
        new SuccessResponse('Success', search).send(res);
    }

    async getSearches(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const savedSearches = await savedSearchService.getSavedSearches(req.user._id);
        new SuccessResponse('Success', savedSearches).send(res)
    }

    async deleteSearch(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const searchId = new Types.ObjectId(req.params['savedSearchId']);
        await savedSearchService.deleteSearch(searchId, req.user._id);
        new SuccessResponse('Success').send(res);
    }

    async deleteSearches(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const stringSearchIds = (req.query.savedSearchIds as string).split(',');
        const searchIds = stringSearchIds.map(id => new Types.ObjectId(id));
        const delCount = await savedSearchService.deleteSearches(searchIds, req.user._id);
        new SuccessResponse(`Success: Deleted ${delCount} Saved Queries`).send(res);
    }
}

export const savedSearchController = new SavedSearchController();
