import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database;

export const initializeDatabase = async (filename = './sweetshop.db') => {
  db = await open({
    filename,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT DEFAULT 'user'
    );
    CREATE TABLE IF NOT EXISTS sweets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      category TEXT,
      price REAL,
      quantity INTEGER
    );
  `);
};

export const getDb = () => {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
};
