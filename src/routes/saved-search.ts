import { Router } from 'express';
import { searchController } from '../controllers/search';
import restricted from '../middlewares/auth-middleware';
import catchAsyncError from '../middlewares/async-error-handler';
import { ValidationSource, validate } from '../validators';
import { baseSearchValidatorSchema } from '../validators/schemas/search-joi-schema';
import { savedSearchController } from '../controllers/saved-search';
import { createOrUpdateManySavedSearchValidatorSchema } from '../validators/schemas/create-or-update-saved-search-validator-schema';

const savedSearchRouter: Router = Router();

savedSearchRouter.route('/')
    .post(
        catchAsyncError(restricted),
        validate(baseSearchValidatorSchema, ValidationSource.BODY),
        catchAsyncError(savedSearchController.createSearch)
    ).get(
        catchAsyncError(restricted),
        catchAsyncError(savedSearchController.getSearches)
    ).delete(
        // Todo: JOI Validation for query params
        catchAsyncError(restricted),
        catchAsyncError(savedSearchController.deleteSearches)
    );

// Batch operation
savedSearchRouter.route('/create-or-update-many')
    .post(
        validate(createOrUpdateManySavedSearchValidatorSchema, ValidationSource.BODY),
        catchAsyncError(restricted),
        catchAsyncError(savedSearchController.createOrUpdateMany)
    );


savedSearchRouter.route('/:savedSearchId')
    .delete(
        // Todo: JOI Validation
        catchAsyncError(restricted),
        catchAsyncError(savedSearchController.deleteSearch)
    );


export default savedSearchRouter;
