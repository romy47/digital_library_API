import { DocumentModel, IDocument, IDocumentInput } from "../models/document";
import { UserModel, IUserInput, IUser } from "../models/user";
import { Types } from 'mongoose';

class DocumentsRepository {
    async getByUserId(id: Types.ObjectId): Promise<IDocument[]> {
        return await DocumentModel.find({
            createdBy: id
        });
    }

    async create(document: IDocumentInput): Promise<IDocument> {
        return await DocumentModel.create(document);
    }

}

export const documentRepository = new DocumentsRepository();
