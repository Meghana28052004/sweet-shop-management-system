import { initializeDatabase, getDb } from '../src/database';
import bcrypt from 'bcrypt';

const seed = async () => {
    await initializeDatabase('sweetshop.db');
    const db = getDb();

    const adminEmail = 'admin@test.com';
    const existingAdmin = await db.get('SELECT * FROM users WHERE email = ?', [adminEmail]);

    if (!existingAdmin) {
        const password = await bcrypt.hash('admin123', 10);
        await db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", [adminEmail, password, 'admin']);
        console.log('Admin user created');
    } else {
        console.log('Admin user already exists');
    }
};

seed();
