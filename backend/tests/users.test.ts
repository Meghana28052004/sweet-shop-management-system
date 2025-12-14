import request from 'supertest';
import app from '../src/app';
import { initializeDatabase } from '../src/database';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getDb } from '../src/database';

describe('Users API', () => {
    let adminToken: string;
    let userToken: string;
    let userId: number;

    beforeAll(async () => {
        await initializeDatabase(':memory:');
        const db = getDb();

        // Create Admin
        const adminPassword = await bcrypt.hash('admin123', 10);
        await db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", ['admin@test.com', adminPassword, 'admin']);
        const admin = await db.get("SELECT * FROM users WHERE email = ?", ['admin@test.com']);
        adminToken = jwt.sign({ id: admin.id, email: admin.email, role: admin.role }, process.env.JWT_SECRET || 'supersecretkey');

        // Create User
        const userPassword = await bcrypt.hash('password', 10);
        await db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", ['user@test.com', userPassword, 'user']);
        const user = await db.get("SELECT * FROM users WHERE email = ?", ['user@test.com']);
        userToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'supersecretkey');
        userId = user.id;
    });

    it('should list all users for admin', async () => {
        const res = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThanOrEqual(2);
    });

    it('should fail listing users for non-admin', async () => {
        const res = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${userToken}`);

        expect(res.statusCode).toEqual(403);
    });

    it('should delete a user for admin', async () => {
        const res = await request(app)
            .delete(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('User deleted successfully');
    });

    it('should fail deleting a user for non-admin', async () => {
        const res = await request(app)
            .delete(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${userToken}`);

        expect(res.statusCode).toEqual(403);
    });
});
