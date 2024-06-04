import { Router } from 'express';
import { documentController } from '../controllers/document';
import restricted from '../middlewares/auth-middleware';
import catchAsyncError from '../middlewares/async-error-handler';

const documentRouter: Router = Router();

documentRouter.route('/').get(
    catchAsyncError(restricted),
    catchAsyncError(documentController.getSavedDocuments)
);

export default documentRouter;
