import { Router } from 'express';
import { searchController } from '../controllers/search';
import restricted from '../middlewares/auth-middleware';
import catchAsyncError from '../middlewares/async-error-handler';
import { ValidationSource, validate } from '../validators';
import { createSearchBodyValidatorSchema } from '../validators/schemas/search-joi-schema';

const searchRouter: Router = Router();

searchRouter.route('/').post(
    catchAsyncError(restricted),
    validate(createSearchBodyValidatorSchema, ValidationSource.BODY),
    catchAsyncError(searchController.createSearch)
);

export default searchRouter;
