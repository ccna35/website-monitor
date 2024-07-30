import express from "express";
import { specs, swaggerUi } from "./swagger";

import sqlite3 from "sqlite3";
import { open } from "sqlite";

import userRoutes from "./routes/users";
import productRoutes from "./routes/products";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Open a database connection
const db = open({
  filename: "./database.db",
  driver: sqlite3.Database,
});

const setupDatabase = async () => {
  const database = await db;

  // Create a table
  await database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    );
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL
    )
  `);
};

setupDatabase().catch((err) => {
  console.error("Database error:", err.message);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
