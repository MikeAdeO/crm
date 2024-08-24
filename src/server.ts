import 'module-alias/register';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { server } from './config/variable';
import { AuthRouter } from './routes/auth.route';
dotenv.config();

const app = express();
const PORT = server.port;

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
const authRouter = new AuthRouter()

app.use('/api/auth/registeration', authRouter.getRouter());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
