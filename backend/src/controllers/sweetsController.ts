import { Response } from 'express';
import { getDb } from '../database';
import { AuthRequest } from '../middleware/authMiddleware';

export const listSweets = async (req: AuthRequest, res: Response) => {
    try {
        const db = getDb();
        const sweets = await db.all('SELECT * FROM sweets');
        res.json(sweets);
    } catch (error) {
        res.json({ error: 'Server error' });
    }
};

export const addSweet = async (req: AuthRequest, res: Response) => {
    const { name, category, price, quantity } = req.body;

    if (!name || !price) {
        return res.status(400).json({ rror: 'Name and Price are required' });
    }

    try {
        const db = getDb();
        const result = await db.run('INSERT INTO sweets (name, category, price, quantity) VALUES (?, ?, ?, ?)', [name, category, price, quantity]);
        res.status(201).json({ id: result.lastID, name, category, price, quantity });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
