import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/products";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The product ID.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The product name.
 *                     example: Product 1
 *                   price:
 *                     type: number
 *                     description: The product price.
 *                     example: 10
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: A single product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The product ID.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The product name.
 *                   example: Product
 *                 price:
 *                   type: number
 *                   description: The product price.
 *                   example: 10
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 description: The product name.
 *                 example: New Product
 *               price:
 *                 type: number
 *                 description: The product price.
 *                 example: 50
 *     responses:
 *       201:
 *         description: The created product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The product ID.
 *                   example: 4
 *                 name:
 *                   type: string
 *                   description: The product name.
 *                   example: New Product
 *                 price:
 *                   type: number
 *                   description: The product price.
 *                   example: 50
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 description: The product name.
 *                 example: Updated Product
 *               price:
 *                 type: number
 *                 description: The product price.
 *                 example: 60
 *     responses:
 *       200:
 *         description: The updated product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The product ID.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The product name.
 *                   example: Updated Product
 *                 price:
 *                   type: number
 *                   description: The product price.
 *                   example: 60
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       204:
 *         description: Product deleted successfully.
 */

// GET /products
router.get("/", getAllProducts);

// GET /products/:id
router.get("/:id", getProductById);

// POST /products
router.post("/", createProduct);

// PUT /products/:id
router.put("/:id", updateProduct);

// DELETE /products/:id
router.delete("/:id", deleteProduct);

export default router;
