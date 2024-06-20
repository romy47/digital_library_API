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

    async get(id: Types.ObjectId): Promise<ILabel | null> {
        return await LabelModel.findById(id);
    }

    async remove(label: ILabel): Promise<void> {
        await LabelModel.findById(label._id).deleteOne();
    }
}

export const labelRepository = new LabelRepository();
