import { Types } from 'mongoose';
import { DocumentModel, IDocument, IDocumentInput } from '../models/document';
import { documentRepository } from '../repositories/document';
import { ILabel, LabelModel } from '../models/label';
import { labelRepository } from '../repositories/label';
import { NotFoundError } from '../models/api-error';
import { labelService } from './label';

class DocumentService {
    async getSavedDocuments(id: Types.ObjectId): Promise<IDocument[]> {
        const documents = await documentRepository.getByUserId(id);
        return documents;
    }

    async saveDocument(document: IDocumentInput): Promise<IDocument> {
        const savedDocument = await documentRepository.create(document);
        return savedDocument;
    }

    async deleteDocument(documentId: Types.ObjectId, userId: Types.ObjectId): Promise<void> {
        await documentRepository.delete(documentId, userId);
    }

    async deleteDocuments(documentIds: Types.ObjectId[], userId: Types.ObjectId): Promise<number> {
        return await documentRepository.deleteBatch(documentIds, userId);
    }

    async createOrUpdateMany(documents: IDocument[], label: ILabel, userId: Types.ObjectId): Promise<void> {
        if (label._id) {
            const existingLabel = await labelRepository.get(label._id);
            if (!existingLabel) {
                throw new NotFoundError('Label not found');
            }
            label = existingLabel
        } else {
            label = await labelService.createLabel(label.title, [], userId)
        }

        documents.forEach(doc => {
            doc.createdBy = doc.createdBy ? doc.createdBy : userId;
            doc._id = doc._id ?? new Types.ObjectId();
            if (doc.labels.indexOf(label._id) === -1) {
                doc.labels.push(label._id);
            }
        });

        const allDocuments = documents.map(d => d._id)

        const bulkUpdate = await DocumentModel.bulkWrite(documents.map(doc => ({
            updateOne: {
                filter: { _id: doc._id ?? new Types.ObjectId() },
                update: doc,
                upsert: true,
            }
        })));

        label.documents = allDocuments;
        LabelModel.updateOne(
            {
                filter: { _id: label._id },
                update: label,
                upsert: false,
            }
        )

        console.log('Bulk: ', bulkUpdate)
    }
    // documents.forEach(d => {
    // d.labe
    //     if (d._id == null || '')
    // })
    // let allDocumentIds = []

    //     }
}

export const documentService = new DocumentService();
