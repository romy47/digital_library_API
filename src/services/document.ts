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

    async createOrUpdateMany(documents: IDocument[], userId: Types.ObjectId, labelAdd?: ILabel, labelRemove?: ILabel): Promise<void> {
        if (labelAdd) {
            if (labelAdd._id) {
                const existingLabel = await labelRepository.get(labelAdd._id);
                if (!existingLabel) {
                    throw new NotFoundError('Label not found');
                }
                labelAdd = existingLabel
            } else {
                labelAdd = await labelService.createLabel(labelAdd.title, [], userId)
            }
        }

        if (labelRemove) {
            await labelService.removeLabel(labelRemove)
        }

        documents.forEach(doc => {
            doc.createdBy = doc.createdBy ? doc.createdBy : userId;
            doc._id = doc._id ?? new Types.ObjectId();

            if (labelAdd) {
                if (doc.labels.indexOf(labelAdd._id) === -1) {
                    doc.labels.push(labelAdd._id);
                }
            }

            if (labelRemove) {
                const removeIndex = doc.labels.indexOf(labelRemove._id);
                if (removeIndex > -1) {
                    doc.labels.splice(removeIndex, 1);
                }
            }
        });

        const bulkUpdate = await DocumentModel.bulkWrite(documents.map(doc => ({
            updateOne: {
                filter: { _id: doc._id ?? new Types.ObjectId() },
                update: doc,
                upsert: true,
            }
        })));

        if (labelAdd) {
            labelAdd.documents = documents.map(d => d._id);
            LabelModel.updateOne(
                {
                    filter: { _id: labelAdd._id },
                    update: labelAdd,
                    upsert: false,
                }
            )
        }
    }
}

export const documentService = new DocumentService();
