import 'module-alias/register';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { server } from './config/variable';
import swaggerConfig from './config/swagger.config';
import { AuthRouter } from './routes/auth.route';
import { LocationRouter } from './routes/location.route';
import { authenticate } from './middlewares/auth.middleware';

dotenv.config();

const app = express();
const PORT = server.port;

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// Swagger setup
const swaggerSpec = swaggerJsdoc(swaggerConfig);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const authRouter = new AuthRouter();
const locationRoute = new LocationRouter()
app.use('/api/auth', authRouter.getRouter());
app.use('/api/location', authenticate, locationRoute.getRouter());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
