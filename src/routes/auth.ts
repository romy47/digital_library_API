import { Router } from 'express';
import { authController } from '../controllers/auth';
import restricted from '../middlewares/auth-middleware';
import catchAsyncError from '../middlewares/async-error-handler';

const authRrouter: Router = Router();
authRrouter.route('/signup').post(
    catchAsyncError(authController.signup)
);
authRrouter.route('/login').post(
    catchAsyncError(authController.login)
);
authRrouter.route('/logout').post(
    catchAsyncError(restricted),
    catchAsyncError(authController.logout)
);
authRrouter.route('/refresh').post(
    catchAsyncError(authController.refresh)
);
export default authRrouter;
