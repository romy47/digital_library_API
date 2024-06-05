import { ISearch, ISearchInput, SearchDocument } from "../models/search";
import { Types } from 'mongoose';

class SearchRepository {
    async create(search: ISearchInput): Promise<ISearch> {
        return await SearchDocument.create(search);
    }
}

export const searchRepository = new SearchRepository();
