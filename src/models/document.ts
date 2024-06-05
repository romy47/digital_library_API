import { Schema, Types, model, Document } from "mongoose";
import { IFacet } from "./facet";

export interface IDocument {
    _id: Types.ObjectId
    title: String,
    linkText: String,
    language: String,
    publisher: String,
    allIdentifiers: String[],
    peerReviewed: Boolean,
    openAccess: Boolean,
    facets: IFacet[],
    creationDate: string,
    doi: String,
    issn: String,
    snippet: String,
    identifier: String,
    description: String,
    source: String,
    secondarySource: String,
    isFocused: Boolean,
    type: String,
    rawObject: {},
    page: Number,
    isSaved: Boolean,
    id: String,
    searchId: Types.ObjectId,
    createdBy: Types.ObjectId,
    labels: []
}

export interface IDocumentInput extends Omit<IDocument, 'createdAt' | 'updatedAt' | '_id'> {
}

const facetSchema = new Schema<IFacet>({
    count: {
        type: Number,
    },
    text: {
        type: String,
        maxlength: 50,
        trim: true,
    },
    type: {
        type: String,
        maxlength: 50,
        trim: true,
    },

})

const documentSchema = new Schema<IDocumentInput>(
    {
        title: {
            type: String,
            trim: true,
            maxlength: 150,
        },
        linkText: {
            type: String,
            trim: true,
            maxlength: 50,
        },
        language: {
            type: String,
            trim: true,
            maxlength: 50,
        },
        publisher: {
            type: String,
            trim: true,
            maxlength: 50,
        },
        allIdentifiers: {
            type: [String],
        },
        peerReviewed: {
            type: Boolean,
            default: false
        },
        openAccess: {
            type: Boolean,
            default: false
        },
        facets: {
            type: [facetSchema],
            default: []
        },
        creationDate: {
            type: String,
            trim: true,
            maxlength: 50,
        },
        doi: {
            type: String,
            trim: true,
            maxlength: 50,
        },
        issn: {
            type: String,
            trim: true,
            maxlength: 50,
        },
        snippet: {
            type: String,
            trim: true,
            maxlength: 50,
        },
        identifier: {
            type: String,
            trim: true,
            maxlength: 50,
        },
        description: {
            type: String,
            trim: true,
            maxlength: 50,
        },
        source: {
            type: String,
            trim: true,
            maxlength: 50,
        },
        secondarySource: {
            type: String,
            trim: true,
            maxlength: 50,
        },
        isFocused: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            maxlength: 50,
            trim: true,
        },
        rawObject: {
            type: Object
        },
        isSaved: {
            type: Boolean,
            default: false
        },
        id: {
            type: String,
            maxlength: 50,
            trim: true,
        },
        searchId: {
            type: Schema.Types.ObjectId,
            ref: 'Search',
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        labels: {
            type: [String],
        },
    },
    {
        timestamps: true,
    },
)

export const DocumentModel = model<IDocumentInput>('Document', documentSchema, 'documents');
