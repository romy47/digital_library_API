import express from 'express';
import cors from 'cors';
import { Application } from 'express';
import router from './routes';
import { initDB } from './database';
import centralErrorHandler from './middlewares/central-error-handler';

export async function createServer(): Promise<Application> {
    const app = express();
    const corsOption = {
        origin: '*',
        credentials: true
    };

    // Initialize server dependencies
    app.use(express());
    app.use(express.json());
    app.use(cors(corsOption));
    app.use(`/api/`, router);
    await initDB();
    app.use(centralErrorHandler);
    return app;
}
