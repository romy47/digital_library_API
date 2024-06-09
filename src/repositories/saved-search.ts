import { NotFoundError } from "../models/api-error";
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

    async delete(searchId: Types.ObjectId, userId: Types.ObjectId): Promise<void> {
        const document = await SavedSearchDocument.findOne({
            _id: searchId,
            createdBy: userId
        });
        if (document == null) {
            throw new NotFoundError('Saved Query Not Found');
        }
        await document.deleteOne();
    }

    async deleteBatch(searchIds: Types.ObjectId[], userId: Types.ObjectId): Promise<number> {
        const del = await SavedSearchDocument.deleteMany({
            _id: { $in: searchIds },
            createdBy: userId
        });
        return del.deletedCount;
    }
}

export const savedSearchRepository = new SavedSearchRepository();
