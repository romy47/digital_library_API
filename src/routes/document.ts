import { Router } from 'express';
import { documentController } from '../controllers/document';
import restricted from '../middlewares/auth-middleware';
import catchAsyncError from '../middlewares/async-error-handler';
import { ValidationSource, validate } from '../validators';
import { saveDocumentValidatorSchema } from '../validators/schemas/document-joi-schema';

const documentRouter: Router = Router();

documentRouter.route('/')
    .get(
        catchAsyncError(restricted),
        catchAsyncError(documentController.getSavedDocuments)
    ).post(
        catchAsyncError(restricted),
        validate(saveDocumentValidatorSchema, ValidationSource.BODY),
        catchAsyncError(documentController.saveDocument)
    ).delete(
        // Todo: JOI Validation for query params
        catchAsyncError(restricted),
        catchAsyncError(documentController.deleteDocuments)
    );

documentRouter.route('/:documentId')
    .delete(
        // Todo: JOI Validation
        catchAsyncError(restricted),
        catchAsyncError(documentController.deleteDocument)
    );


export default documentRouter;
