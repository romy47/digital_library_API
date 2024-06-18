import { Router } from 'express';
import restricted from '../middlewares/auth-middleware';
import catchAsyncError from '../middlewares/async-error-handler';
import { ValidationSource, validate } from '../validators';
import { updateLabelBodyValidatorSchema } from '../validators/schemas/label-joi-schema';
import { labelController } from '../controllers/label';

const labelRouter: Router = Router();

labelRouter.route('/').post(
    catchAsyncError(restricted),
    validate(updateLabelBodyValidatorSchema, ValidationSource.BODY),
    catchAsyncError(labelController.createLabel)
);

export default labelRouter;
