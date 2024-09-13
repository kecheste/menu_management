import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'https://menu-management-ltyh.vercel.app/',
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

import menuRoutes from './routes/menu.js';

app.use('/menu', menuRoutes);













 app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });