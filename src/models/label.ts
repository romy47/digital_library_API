import { ObjectId, Schema, Types, model } from "mongoose";
import { IDocument } from "./document";

export interface ILabel {
    _id: String,
    title: String,
    documents?: Types.ObjectId[],
    createdBy: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}

export interface ILabelInput extends Omit<ILabel, 'createdAt' | 'updatedAt' | '_id'> {
}

const labelSchema = new Schema<ILabel>(
    {
        title: {
            type: String,
            trim: true,
            maxlength: 50,
        },
        documents: [{
            type: Schema.ObjectId,
            ref: 'Document'
        }],
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

export const LabelModel = model<ILabel>('Label', labelSchema, 'labels');
