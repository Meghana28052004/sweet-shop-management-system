import { Response } from 'express';
import { getDb } from '../database';
import { AuthRequest } from '../middleware/authMiddleware';

export const purchaseSweet = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    try {
        const db = getDb();
        const sweet = await db.get('SELECT * FROM sweets WHERE id = ?', [id]);

        if (!sweet) {
            return res.status(404).json({ error: 'Sweet not found' });
        }

        if (sweet.quantity <= 0) {
            return res.status(400).json({ error: 'Out of stock' });
        }

        await db.run('UPDATE sweets SET quantity = quantity - 1 WHERE id = ?', [id]);
        res.json({ message: 'Purchase successful' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const restockSweet = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
        return res.status(400).json({ error: 'Valid quantity is required' });
    }

    try {
        const db = getDb();
        const sweet = await db.get('SELECT * FROM sweets WHERE id = ?', [id]);

        if (!sweet) {
            return res.status(404).json({ error: 'Sweet not found' });
        }

        await db.run('UPDATE sweets SET quantity = quantity + ? WHERE id = ?', [quantity, id]);
        res.json({ message: 'Restock successful' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
