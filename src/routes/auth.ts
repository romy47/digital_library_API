import { Router } from 'express';
import { authController } from '../controllers/auth';
import catchAsyncError from '../middlewares/async-error-handler';

const authRrouter: Router = Router();
authRrouter.route('/signup').post(
    catchAsyncError(authController.signup)
);
authRrouter.route('/login').post(
    catchAsyncError(authController.login)
);
export default authRrouter;
