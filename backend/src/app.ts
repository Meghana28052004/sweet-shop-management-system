import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import sweetsRoutes from './routes/sweets';
import usersRoutes from './routes/users';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetsRoutes);
app.use('/api/users', usersRoutes);

app.get('/', (req, res) => {
    res.send('Sweet Shop API');
});

export default app;
