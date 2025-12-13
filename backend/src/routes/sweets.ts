import express from 'express';
import { listSweets, addSweet } from '../controllers/sweetsController';
import { purchaseSweet, restockSweet } from '../controllers/inventoryController';
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// List sweets (Protected)
router.get('/', verifyToken, listSweets);

// Add sweet (Admin only)
router.post('/', verifyToken, verifyAdmin, addSweet);

// Inventory (Protected)
router.post('/:id/purchase', verifyToken, purchaseSweet);
router.post('/:id/restock', verifyToken, verifyAdmin, restockSweet);

export default router;
