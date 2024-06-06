import { Router } from 'express';
import authRouter from './auth';
import documentRouter from './document';
import searchRouter from './search';
import savedSearchRouter from './saved-search';

const router: Router = Router();
router.use('/auth/', authRouter);
router.use('/searches/', searchRouter);
router.use('/saved-searches/', savedSearchRouter);
router.use('/documents/', documentRouter);

export default router;