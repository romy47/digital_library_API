import { Router } from 'express';
import { searchController } from '../controllers/search';
import restricted from '../middlewares/auth-middleware';
import catchAsyncError from '../middlewares/async-error-handler';
import { ValidationSource, validate } from '../validators';
import { createSavedSearchBodyValidatorSchema } from '../validators/schemas/search-joi-schema';
import { savedSearchController } from '../controllers/saved-search';

const savedSearchRouter: Router = Router();

savedSearchRouter.route('/').post(
    catchAsyncError(restricted),
    validate(createSavedSearchBodyValidatorSchema, ValidationSource.BODY),
    catchAsyncError(savedSearchController.createSearch)
);
savedSearchRouter.route('/').get(
    catchAsyncError(restricted),
    catchAsyncError(savedSearchController.getSearches)
);

export default savedSearchRouter;
