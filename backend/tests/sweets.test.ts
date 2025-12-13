import request from 'supertest';
import app from '../src/app';
import { initializeDatabase, getDb } from '../src/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

describe('Sweets API', () => {
    let adminToken: string;
    let userToken: string;

    beforeAll(async () => {
        await initializeDatabase(':memory:');
        const db = getDb();

        // Create Admin
        const adminPass = await bcrypt.hash('admin123', 10);
        await db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", ['admin@test.com', adminPass, 'admin']);
        // Create User
        const userPass = await bcrypt.hash('user123', 10);
        await db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", ['user@test.com', userPass, 'user']);

        // Login Admin
        const adminRes = await request(app).post('/api/auth/login').send({ email: 'admin@test.com', password: 'admin123' });
        adminToken = adminRes.body.token;

        // Login User
        const userRes = await request(app).post('/api/auth/login').send({ email: 'user@test.com', password: 'user123' });
        userToken = userRes.body.token;
    });

    it('should list sweets (authenticated)', async () => {
        const res = await request(app)
            .get('/api/sweets')
            .set('Authorization', `Bearer ${userToken}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should fail adding sweet if not authorized', async () => {
        const res = await request(app)
            .post('/api/sweets')
            .send({ name: 'Ladoo', category: 'Indian', price: 10, quantity: 100 });
        expect(res.status).toBe(401); // Missing token
    });

    // Assuming POST /api/sweets is protected. Spec says "Sweets (Protected)". 
    // Usually only Admin adds sweets, but requirement says "Users must be able to register... (For Admin Users) Forms/UI to add...".
    // So only Admin can add.
    it('should allow admin to add sweet', async () => {
        const res = await request(app)
            .post('/api/sweets')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ name: 'Jalebi', category: 'Indian', price: 20, quantity: 50 });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should forbid non-admin from adding sweet', async () => {
        const res = await request(app)
            .post('/api/sweets')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ name: 'Barfi', category: 'Indian', price: 15, quantity: 20 });
        expect(res.status).toBe(403);
    });
});
