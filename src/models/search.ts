import { Schema, Types, model } from "mongoose";

export interface ISearch {
    _id: Types.ObjectId
    searchQuery: String,
    totalDocuments: Number,
    createdBy: Types.ObjectId,
    createdAt: Date;
    updatedAt: Date;
}

export interface ISearchInput extends Omit<ISearch, 'createdAt' | 'updatedAt' | '_id'> {
}

const searchSchema = new Schema<ISearch>(
    {
        searchQuery: {
            type: String,
            trim: true,
            maxlength: 50,
        },
        totalDocuments: {
            type: Number
        },
        createdBy: {
            type: Schema.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true,
    }
)

export const SearchDocument = model<ISearch>('Search', searchSchema, 'searches');
export const SavedSearchDocument = model<ISearch>('SavedSearch', searchSchema, 'savedSearches');
