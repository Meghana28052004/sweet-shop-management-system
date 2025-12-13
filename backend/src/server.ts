import app from './app';
import { initializeDatabase } from './database';

const PORT = 3000;

const start = async () => {
    try {
        await initializeDatabase();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
