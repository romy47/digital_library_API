import { Types } from 'mongoose';
import { IDocument } from '../models/document';
import { documentRepository } from '../repositories/document';

class DocumentService {
    async getSavedDocuments(id: Types.ObjectId): Promise<IDocument[]> {
        const documents = await documentRepository.getByUserId(id);
        return documents;
    }
}

export const documentService = new DocumentService();
