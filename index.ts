import * as dotenv from 'dotenv';
import server from './src/server';

dotenv.config();

export const handler = server;
