import { Router } from 'express';
import { authController } from '../controllers/auth';

const authRrouter: Router = Router();
authRrouter.route('/signup').post(authController.signup);
export default authRrouter;
