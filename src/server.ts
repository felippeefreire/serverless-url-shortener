import serverless from 'serverless-http';
import express, { Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import addRoutes from './routes';

const router = Router();

const app = express();

app.use(cors());

app.use(
  bodyParser.json({ limit: process.env.EXPRESS_PAYLOAD_LIMIT || '10mb' }),
);

addRoutes(router);

app.use('/', router);

export default serverless(app);
