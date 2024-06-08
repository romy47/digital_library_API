import { Schema, Types, model, Document } from "mongoose";
import { IFacet } from "./facet";
import { ILabel } from "./label";

export interface IDocument {
    _id: Types.ObjectId
    title: String,
    linkText: String,
    language: String,
    publisher: String,
    allIdentifiers: String[],
    peerReviewed: Boolean,
    openAccess: Boolean,
    facets: {
        topics: IFacet[],
        contributors: IFacet[],
        journalTitles: IFacet[],
        resourceTypes: IFacet[]
    },
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
    createdBy: Types.ObjectId,
    labels: ILabel[],
    createdAt: Date,
    updatedAt: Date
}

export interface IDocumentInput extends Omit<IDocument, 'createdAt' | 'updatedAt' | '_id'> {
}

const facetSchema = new Schema<IFacet>({
    count: {
        type: Number,
    },
    text: {
        type: String,
        trim: true,
    },
})

const documentSchema = new Schema<IDocument>(
    {
        title: {
            type: String,
            trim: true,
        },
        linkText: {
            type: String,
            trim: true,
        },
        language: {
            type: String,
            trim: true,
        },
        publisher: {
            type: String,
            trim: true,
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
            type: Object,
        },
        creationDate: {
            type: String,
            trim: true,
        },
        doi: {
            type: String,
            trim: true,
        },
        issn: {
            type: String,
            trim: true,
        },
        snippet: {
            type: String,
            trim: true,
        },
        identifier: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        source: {
            type: String,
            trim: true,
        },
        secondarySource: {
            type: String,
            trim: true,
        },
        isFocused: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
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
            trim: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        labels: {
            type: [{
                type: Schema.ObjectId,
                ref: 'Label'
            }],
        },
    },
    {
        timestamps: true,
    },
)

export const DocumentModel = model<IDocument>('Document', documentSchema, 'documents');
