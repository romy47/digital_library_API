import { Router } from 'express';
import { documentController } from '../controllers/document';
import restricted from '../middlewares/auth-middleware';
import catchAsyncError from '../middlewares/async-error-handler';
import { ValidationSource, validate } from '../validators';
import { saveDocumentValidatorSchema } from '../validators/schemas/document-joi-schema';

const documentRouter: Router = Router();

documentRouter.route('/').get(
    catchAsyncError(restricted),
    catchAsyncError(documentController.getSavedDocuments)
);

documentRouter.route('/').post(
    catchAsyncError(restricted),
    validate(saveDocumentValidatorSchema, ValidationSource.BODY),
    catchAsyncError(documentController.saveDocument)
);

export default documentRouter;
