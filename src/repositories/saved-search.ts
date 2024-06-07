import { ISearch, ISearchInput, SavedSearchDocument } from "../models/search";
import { Types } from 'mongoose';

class SavedSearchRepository {
    async create(search: ISearchInput): Promise<ISearch> {
        return await SavedSearchDocument.create(search);
    }

    async get(userId: Types.ObjectId): Promise<ISearch[]> {
        return await SavedSearchDocument.find({
            createdBy: userId
        });
    }
}

export const savedSearchRepository = new SavedSearchRepository();
