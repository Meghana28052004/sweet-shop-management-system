import request from 'supertest';
import app from '../src/app';
import { initializeDatabase } from '../src/database';

describe('Auth API', () => {

    beforeAll(async () => {
        await initializeDatabase(':memory:');
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', 'User registered successfully');
    });

    it('should login an existing user', async () => {
        // First register
        await request(app)
            .post('/api/auth/register')
            .send({
                email: 'login@example.com',
                password: 'password123'
            });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'login@example.com',
                password: 'password123'
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
    });
});
