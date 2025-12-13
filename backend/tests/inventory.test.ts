import request from 'supertest';
import app from '../src/app';
import { initializeDatabase, getDb } from '../src/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

describe('Inventory API', () => {
    let adminToken: string;
    let userToken: string;
    let sweetId: number;

    beforeAll(async () => {
        await initializeDatabase(':memory:');
        const db = getDb();

        const adminPass = await bcrypt.hash('admin123', 10);
        await db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", ['admin@test.com', adminPass, 'admin']);
        const userPass = await bcrypt.hash('user123', 10);
        await db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", ['user@test.com', userPass, 'user']);

        const adminRes = await request(app).post('/api/auth/login').send({ email: 'admin@test.com', password: 'admin123' });
        adminToken = adminRes.body.token;

        const userRes = await request(app).post('/api/auth/login').send({ email: 'user@test.com', password: 'user123' });
        userToken = userRes.body.token;

        // Add a sweet
        const sweetRes = await db.run("INSERT INTO sweets (name, category, price, quantity) VALUES (?, ?, ?, ?)", ['Ladoo', 'Indian', 10, 10]);
        sweetId = sweetRes.lastID!;
    });

    it('should allow user to purchase a sweet', async () => {
        const res = await request(app)
            .post(`/api/sweets/${sweetId}/purchase`)
            .set('Authorization', `Bearer ${userToken}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Purchase successful');
        
        const db = getDb();
        const sweet = await db.get("SELECT quantity FROM sweets WHERE id = ?", [sweetId]);
        expect(sweet.quantity).toBe(9);
    });

    it('should allow admin to restock a sweet', async () => {
        const res = await request(app)
            .post(`/api/sweets/${sweetId}/restock`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ quantity: 5 });
        expect(res.status).toBe(200);
        
        const db = getDb();
        const sweet = await db.get("SELECT quantity FROM sweets WHERE id = ?", [sweetId]);
        expect(sweet.quantity).toBe(14); // 9 + 5
    });

    it('should fail purchase if out of stock', async () => {
        const db = getDb();
        // Set stock to 0
        await db.run("UPDATE sweets SET quantity = 0 WHERE id = ?", [sweetId]);

        const res = await request(app)
            .post(`/api/sweets/${sweetId}/purchase`)
            .set('Authorization', `Bearer ${userToken}`);
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error', 'Out of stock');
    });
});
