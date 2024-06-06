import { ISearch, ISearchInput, SavedSearchDocument } from "../models/search";

class SavedSearchRepository {
    async create(search: ISearchInput): Promise<ISearch> {
        return await SavedSearchDocument.create(search);
    }
}

export const savedSearchRepository = new SavedSearchRepository();
