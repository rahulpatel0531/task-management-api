const express = require("express");
const {
  registerUser,
  loginUser,
} = require("../controllers/auth.controller");
const {
  registerValidator,
  loginValidator
} = require("../validators/user.validator.js");
const validate = require("../middlewares/validate.js");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rahul
 *               email:
 *                 type: string
 *                 example: rahul@gmail.com
 *               password:
 *                 type: string
 *                 example: Rahul@123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post("/register", registerValidator, validate, registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: rahul@gmail.com
 *               password:
 *                 type: string
 *                 example: Rahul@123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", loginValidator, validate, loginUser);

module.exports = router;
