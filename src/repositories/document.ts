import { NotFoundError } from "../models/api-error";
import { DocumentModel, IDocument, IDocumentInput } from "../models/document";
import { UserModel, IUserInput, IUser } from "../models/user";
import { Types } from 'mongoose';

class DocumentsRepository {
    async getByUserId(id: Types.ObjectId): Promise<IDocument[]> {
        return await DocumentModel.find({
            createdBy: id
        }).populate('labels');
    }

    async create(document: IDocumentInput): Promise<IDocument> {
        return await DocumentModel.create(document);
    }

    async delete(documentId: Types.ObjectId, userId: Types.ObjectId): Promise<void> {
        const document = await DocumentModel.findOne({
            _id: documentId,
            createdBy: userId
        });
        if (document == null) {
            throw new NotFoundError('Document Not Found');
        }
        await document.deleteOne();
    }

    async deleteBatch(documentIds: Types.ObjectId[], userId: Types.ObjectId): Promise<number> {
        const del = await DocumentModel.deleteMany({
            _id: { $in: documentIds },
            createdBy: userId
        });
        return del.deletedCount;
    }

}

export const documentRepository = new DocumentsRepository();
