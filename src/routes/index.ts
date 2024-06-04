import { Router } from 'express';
import authRouter from './auth';
import documentRouter from './document';

const router: Router = Router();
router.use('/auth/', authRouter);
router.use('/documents/', documentRouter);

export default router;