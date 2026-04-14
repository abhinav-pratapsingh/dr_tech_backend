import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import apiRoutes from './routes/index.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(
    cors({
        origin: env.frontendUrl,
        methods: ['GET', 'POST'],
        credentials: false
    })
);
app.use(express.json());

app.use('/api', apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;