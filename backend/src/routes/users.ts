import express from 'express';
import { getUsers, deleteUser } from '../controllers/usersController';
import { verifyToken } from '../middleware/authMiddleware';
import { verifyAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', verifyToken, verifyAdmin, getUsers);
router.delete('/:id', verifyToken, verifyAdmin, deleteUser);

export default router;
