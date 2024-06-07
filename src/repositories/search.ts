import { ISearch, ISearchInput, SearchDocument } from "../models/search";
import { Types } from 'mongoose';

class SearchRepository {
    async create(search: ISearchInput): Promise<ISearch> {
        return await SearchDocument.create(search);
    }

    async get(userId: Types.ObjectId): Promise<ISearch[]> {
        return await SearchDocument.find({
            createdBy: userId
        });
    }
}

export const searchRepository = new SearchRepository();
