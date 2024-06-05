import { Types } from 'mongoose';
import { IDocument, IDocumentInput } from '../models/document';
import { documentRepository } from '../repositories/document';

class DocumentService {
    async getSavedDocuments(id: Types.ObjectId): Promise<IDocument[]> {
        const documents = await documentRepository.getByUserId(id);
        return documents;
    }

    async saveDocument(document: IDocumentInput): Promise<IDocument> {

        const savedDocument = await documentRepository.create(document);
        return savedDocument;
    }
}

export const documentService = new DocumentService();
