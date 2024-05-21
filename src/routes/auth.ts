import { Router } from 'express';
import { authController } from '../controllers/auth';
import restricted from '../middlewares/auth-middleware';
import catchAsyncError from '../middlewares/async-error-handler';
import { ValidationSource, validate } from '../validators';
import { loginBodyValidatorSchema, refreshValidatorSchema, signupBodyValidatorSchema } from '../validators/schemas/auth-joi-schema';

const authRrouter: Router = Router();
authRrouter.route('/signup').post(
    validate(signupBodyValidatorSchema, ValidationSource.BODY),
    catchAsyncError(authController.signup)
);
authRrouter.route('/login').post(
    validate(loginBodyValidatorSchema, ValidationSource.BODY),
    catchAsyncError(authController.login)
);
authRrouter.route('/logout').post(
    validate(refreshValidatorSchema, ValidationSource.BODY),
    catchAsyncError(restricted),
    catchAsyncError(authController.logout)
);
authRrouter.route('/refresh').post(
    validate(refreshValidatorSchema, ValidationSource.BODY),
    catchAsyncError(authController.refresh)
);
export default authRrouter;
