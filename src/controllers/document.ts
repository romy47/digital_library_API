import { Request, Response, NextFunction } from "express";
import { authService } from '../services/auth'
import { tokenService } from '../services/token'
import { SuccessResponse } from "../models/api-response";
import { documentService } from "../services/document";
import IRequest from "../models/request";
import { IDocumentInput } from "../models/document";
import { Types } from "mongoose";

class DocumentController {
    async getSavedDocuments(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const documents = await documentService.getSavedDocuments(req.user._id);
        new SuccessResponse('Success', documents).send(res)
    }

    async saveDocument(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const document = {
            title: req.body.title,
            linkText: req.body.linkText,
            language: req.body.language,
            publisher: req.body.publisher,
            allIdentifiers: req.body.allIdentifiers,
            peerReviewed: req.body.peerReviewed,
            openAccess: req.body.openAccess,
            facets: req.body.facets,
            creationDate: req.body.creationDate,
            doi: req.body.doi,
            issn: req.body.issn,
            snippet: req.body.snippet,
            identifier: req.body.identifier,
            description: req.body.description,
            source: req.body.source,
            secondarySource: req.body.secondarySource,
            isFocused: req.body.isFocused,
            type: req.body.type,
            rawObject: req.body.rawObject,
            page: req.body.page,
            isSaved: req.body.isSaved,
            id: req.body.id,
            createdBy: req.user._id,
            labels: req.body.labels
        } as IDocumentInput;
        const savedDocument = await documentService.saveDocument(document);
        new SuccessResponse('Success', savedDocument).send(res);
    }

    async deleteDocument(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const documentId = new Types.ObjectId(req.params['documentId']);
        await documentService.deleteDocument(documentId, req.user._id);
        new SuccessResponse('Success').send(res);
    }

    async deleteDocuments(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const stringDocumentIds = (req.query.documentIds as string).split(',');
        const documentIds = stringDocumentIds.map(id => new Types.ObjectId(id));
        const delCount = await documentService.deleteDocuments(documentIds, req.user._id);
        new SuccessResponse(`Success: Deleted ${delCount} documents`).send(res);
    }
}

export const documentController = new DocumentController();
