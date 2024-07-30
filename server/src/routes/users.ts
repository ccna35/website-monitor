import { Router, Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/users";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The user name.
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     description: The user email.
 *                     example: johndoe@example.com
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user ID.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The user name.
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   description: The user email.
 *                   example: johndoe@example.com
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user name.
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 description: The user email.
 *                 example: janedoe@example.com
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user ID.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The user name.
 *                   example: Jane Doe
 *                 email:
 *                   type: string
 *                   description: The user email.
 *                   example: janedoe@example.com
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user name.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The user email.
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: The updated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user ID.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The user name.
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   description: The user email.
 *                   example: johndoe@example.com
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */

// Get all users
router.get("/", getUsers);

// Get a single user
router.get("/:id", getUserById);

// Create a new user
router.post("/", createUser);

// Update an existing user
router.put("/:id", updateUser);

// Delete an existing user
router.delete("/:id", deleteUser);

export default router;
