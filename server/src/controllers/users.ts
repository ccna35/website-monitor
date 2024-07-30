import { Request, Response } from "express";
import database from "../database";
import { isError } from "../utils";

// User type
type User = {
  id: number;
  name: string;
  email: string;
};

const users: User[] = [];

// GET /users
const getUsers = async (req: Request, res: Response) => {
  try {
    const db = await database;
    const users = await db.all("SELECT * FROM users");
    res.json(users);
  } catch (err) {
    if (isError(err)) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

// GET /users/:id
const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const db = await database;
    const user = await db.get("SELECT * FROM users WHERE id = ?", userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    if (isError(err)) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

// POST /users
const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const db = await database;
    // Check if the user already exists
    const existingUser = await db.get(
      "SELECT * FROM users WHERE email = ?",
      email
    );
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const result = await db.run(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      name,
      email
    );

    const user = await db.get(
      "SELECT * FROM users WHERE id = ?",
      result.lastID
    );

    res.status(201).json(user);
  } catch (err) {
    if (isError(err)) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

// PUT /users/:id
const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  try {
    const db = await database;
    // Check if the user exists
    const user = await db.get("SELECT * FROM users WHERE id = ?", userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await db.run(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      name,
      email,
      userId
    );
    const updatedUser = await db.get(
      "SELECT * FROM users WHERE id = ?",
      userId
    );
    res.json(updatedUser);
  } catch (err) {
    if (isError(err)) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

// DELETE /users/:id
const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const db = await database;
    // Check if the user exists
    const user = await db.get("SELECT * FROM users WHERE id = ?", userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await db.run("DELETE FROM users WHERE id = ?", userId);
    res.sendStatus(204);
  } catch (err) {
    if (isError(err)) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

// Export the controllers
export { getUsers, getUserById, createUser, updateUser, deleteUser };
