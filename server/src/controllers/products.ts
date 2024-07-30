import { Request, Response } from "express";
import database from "../database";
import { isError } from "../utils";

// Get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const db = await database;
    const products = await db.all("SELECT * FROM products");
    res.json(products);
  } catch (err) {
    if (isError(err)) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

// GET /products/:id
const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const db = await database;
    const product = await db.get("SELECT * FROM products WHERE id = ?", id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    if (isError(err)) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

// POST /products
const createProduct = async (req: Request, res: Response) => {
  const { name, price } = req.body;

  try {
    const db = await database;
    const result = await db.run(
      "INSERT INTO products (name, price) VALUES (?, ?)",
      name,
      price
    );
    const product = await db.get(
      "SELECT * FROM products WHERE id = ?",
      result.lastID
    );

    res.json(product);
  } catch (err) {
    if (isError(err)) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

// PUT /products/:id
const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price } = req.body;

  try {
    const db = await database;
    const result = await db.run(
      "UPDATE products SET name = ?, price = ? WHERE id = ?",
      name,
      price,
      id
    );

    if (result.changes) {
      const product = await db.get("SELECT * FROM products WHERE id = ?", id);
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    if (isError(err)) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

// DELETE /products/:id
const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const db = await database;
    const result = await db.run("DELETE FROM products WHERE id = ?", id);

    if (result.changes) {
      res.json({ message: "Product deleted" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    if (isError(err)) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

// Export the controllers
export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
