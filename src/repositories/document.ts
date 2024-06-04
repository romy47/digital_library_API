import { DocumentModel, IDocument } from "../models/document";
import { UserModel, IUserInput, IUser } from "../models/user";
import { Types } from 'mongoose';

class DocumentsRepository {
    async getByUserId(id: Types.ObjectId): Promise<IDocument[]> {
        return await DocumentModel.find({
            createdBy: id
        });
    }

}

export const documentRepository = new DocumentsRepository();
