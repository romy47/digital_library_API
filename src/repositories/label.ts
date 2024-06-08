import { DocumentModel } from "../models/document";
import { ILabel, ILabelInput, LabelModel } from "../models/label";
import { ISearch, SearchDocument } from "../models/search";
import { Types } from 'mongoose';

class LabelRepository {
    async create(label: ILabelInput): Promise<ILabel> {
        const savedLabel = await LabelModel.create(label);
        await DocumentModel.updateMany({ '_id': savedLabel.documents }, { $push: { labels: savedLabel._id } })
        return savedLabel;
    }

    async get(userId: Types.ObjectId): Promise<ISearch[]> {
        return await SearchDocument.find({
            createdBy: userId
        });
    }
}

export const labelRepository = new LabelRepository();
