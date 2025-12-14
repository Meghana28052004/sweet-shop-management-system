import { Request, Response } from 'express';
import { getDb } from '../database';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const db = getDb();
        const users = await db.all('SELECT id, email, role FROM users');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const db = getDb();
        await db.run('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
