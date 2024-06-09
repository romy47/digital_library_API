import { Types } from 'mongoose';
import { ISearch, ISearchInput } from '../models/search';
import { searchRepository } from '../repositories/search';
import fetch from 'cross-fetch';
import { DefaultConfig } from '../config';
import { savedSearchRepository } from '../repositories/saved-search';

class SavedSearchService {
    async createSearch(searchQuery: string, totalDocuments: number, createdBy: Types.ObjectId): Promise<ISearch> {
        const search = await savedSearchRepository.create(
            {
                searchQuery: searchQuery,
                totalDocuments: totalDocuments,
                createdBy: createdBy
            } as ISearchInput);
        return search;
    }

    async getSavedSearches(id: Types.ObjectId): Promise<ISearch[]> {
        const savedSearches = await savedSearchRepository.get(id);
        return savedSearches;
    }

    async deleteSearch(searchId: Types.ObjectId, userId: Types.ObjectId): Promise<void> {
        await savedSearchRepository.delete(searchId, userId);
    }

    async deleteSearches(searchIds: Types.ObjectId[], userId: Types.ObjectId): Promise<number> {
        return await savedSearchRepository.deleteBatch(searchIds, userId);
    }
}

export const savedSearchService = new SavedSearchService();
