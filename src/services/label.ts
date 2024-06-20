import { Types } from 'mongoose';
import { ILabel, ILabelInput } from '../models/label';
import { labelRepository } from '../repositories/label';

class LabelService {
    async createLabel(title: string, documentIds = [], createdBy: Types.ObjectId): Promise<ILabel> {
        const label = await labelRepository.create(
            {
                title: title,
                documents: documentIds,
                createdBy: createdBy
            } as ILabelInput);
        return label;
    }

    async removeLabel(label: ILabel): Promise<void> {
        await labelRepository.remove(label)
    }
}

export const labelService = new LabelService();
