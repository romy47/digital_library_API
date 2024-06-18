import { Router } from 'express';
import { documentController } from '../controllers/document';
import restricted from '../middlewares/auth-middleware';
import catchAsyncError from '../middlewares/async-error-handler';
import { ValidationSource, validate } from '../validators';
import { baseDocumentValidatorSchema } from '../validators/schemas/document-joi-schema';
import { createOrUpdateManyDocumentValidatorSchema } from '../validators/schemas/create-or-update-many-document-joi-schema';

const documentRouter: Router = Router();

documentRouter.route('/')
    .get(
        catchAsyncError(restricted),
        catchAsyncError(documentController.getSavedDocuments)
    ).post(
        catchAsyncError(restricted),
        validate(baseDocumentValidatorSchema, ValidationSource.BODY),
        catchAsyncError(documentController.saveDocument)
    ).delete(
        // Todo: JOI Validation for query params
        catchAsyncError(restricted),
        catchAsyncError(documentController.deleteDocuments)
    ).patch(

);

// Batch operation
documentRouter.route('/create-or-update-many')
    .post(
        validate(createOrUpdateManyDocumentValidatorSchema, ValidationSource.BODY),
        catchAsyncError(restricted),
        catchAsyncError(documentController.createOrUpdateMany)
    );


documentRouter.route('/:documentId')
    .delete(
        // Todo: JOI Validation
        catchAsyncError(restricted),
        catchAsyncError(documentController.deleteDocument)
    );


export default documentRouter;
