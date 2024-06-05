import { Router } from 'express';
import authRouter from './auth';
import documentRouter from './document';
import searchRouter from './search';

const router: Router = Router();
router.use('/auth/', authRouter);
router.use('/search/', searchRouter);
router.use('/documents/', documentRouter);

export default router;