import { Types } from 'mongoose';
import { ISearch, ISearchInput, SavedSearchDocument } from '../models/search';
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

    async createOrUpdateMany(savedSearches: ISearch[], userId: Types.ObjectId): Promise<void> {
        savedSearches.forEach(search => {
            search.createdBy = search.createdBy ? search.createdBy : userId;
            search._id = search._id ?? new Types.ObjectId();
        });

        const bulkUpdate = await SavedSearchDocument.bulkWrite(savedSearches.map(search => ({
            updateOne: {
                filter: { _id: search._id ?? new Types.ObjectId() },
                update: search,
                upsert: true,
            }
        })));
    }
}

export const savedSearchService = new SavedSearchService();
