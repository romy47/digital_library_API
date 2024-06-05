import { Schema, Types, model } from "mongoose";

export interface ISearch {
    _id: Types.ObjectId
    searchQuery: String,
    totalDocuments: Number,
    createdBy: Types.ObjectId
}

export interface ISearchInput extends Omit<ISearch, 'createdAt' | 'updatedAt' | '_id'> {
}

const searchSchema = new Schema<ISearchInput>(
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

export const SearchDocument = model<ISearchInput>('Search', searchSchema, 'searches');
