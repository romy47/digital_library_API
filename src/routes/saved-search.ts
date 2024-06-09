import { Router } from 'express';
import { searchController } from '../controllers/search';
import restricted from '../middlewares/auth-middleware';
import catchAsyncError from '../middlewares/async-error-handler';
import { ValidationSource, validate } from '../validators';
import { createSavedSearchBodyValidatorSchema } from '../validators/schemas/search-joi-schema';
import { savedSearchController } from '../controllers/saved-search';

const savedSearchRouter: Router = Router();

savedSearchRouter.route('/')
    .post(
        catchAsyncError(restricted),
        validate(createSavedSearchBodyValidatorSchema, ValidationSource.BODY),
        catchAsyncError(savedSearchController.createSearch)
    ).get(
        catchAsyncError(restricted),
        catchAsyncError(savedSearchController.getSearches)
    ).delete(
        // Todo: JOI Validation for query params
        catchAsyncError(restricted),
        catchAsyncError(savedSearchController.deleteSearches)
    );

savedSearchRouter.route('/:savedSearchId')
    .delete(
        // Todo: JOI Validation
        catchAsyncError(restricted),
        catchAsyncError(savedSearchController.deleteSearch)
    );


export default savedSearchRouter;
