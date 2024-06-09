import { Router } from 'express';
import { searchController } from '../controllers/search';
import restricted from '../middlewares/auth-middleware';
import catchAsyncError from '../middlewares/async-error-handler';
import { ValidationSource, validate } from '../validators';
import { createSearchBodyValidatorSchema } from '../validators/schemas/search-joi-schema';

const searchRouter: Router = Router();

searchRouter.route('/')
    .post(
        catchAsyncError(restricted),
        validate(createSearchBodyValidatorSchema, ValidationSource.BODY),
        catchAsyncError(searchController.createSearch)
    )
    .get(
        catchAsyncError(restricted),
        catchAsyncError(searchController.getSearches)
    )
    .delete(
        // Todo: JOI Validation for query params
        catchAsyncError(restricted),
        catchAsyncError(searchController.deleteSearches)
    );

searchRouter.route('/:searchId')
    .delete(
        // Todo: JOI Validation
        catchAsyncError(restricted),
        catchAsyncError(searchController.deleteSearch)
    );

export default searchRouter;
