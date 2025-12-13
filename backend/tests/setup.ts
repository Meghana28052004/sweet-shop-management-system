import { getDb } from '../src/database';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const setupTestDb = async () => {
    const db = await open({
        filename: ':memory:', // Use in-memory DB for tests
        driver: sqlite3.Database
    });

    // Create tables for testing
    await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
    );
    CREATE TABLE IF NOT EXISTS sweets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      category TEXT,
      price REAL,
      quantity INTEGER
    );
  `);

    return db;
}
