import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './src/config/env.js';
import healthRoutes from './src/routes/healthRoutes.js';
import contactRoutes from './src/routes/contactRoutes.js';
import bookingRoutes from './src/routes/bookingRoutes.js';
import { getHealth } from './src/controllers/healthController.js';
import { notFoundHandler, errorHandler } from './src/middleware/errorHandler.js';

const app = express();

app.use(morgan('dev'));

app.use(
    cors({
        origin: env.frontendUrl,
        methods: ['GET', 'POST'],
        credentials: false
    })
);
app.use(express.json());

app.get('/health', getHealth);
app.use('/api', healthRoutes);
app.use('/api', contactRoutes);
app.use('/api', bookingRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.port, () => {
    console.log(`Backend running on port ${env.port}`);
});
