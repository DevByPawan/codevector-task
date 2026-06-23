const express = require("express");

const {
    getProducts,
} = require("../controllers/productController");

const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get products with cursor pagination
 *     description: Browse products with optional category filter and cursor-based pagination.
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of products per page
 *       - in: query
 *         name: cursorUpdatedAt
 *         schema:
 *           type: string
 *         description: Cursor updated_at value
 *       - in: query
 *         name: cursorId
 *         schema:
 *           type: string
 *         description: Cursor id value
 *     responses:
 *       200:
 *         description: Product list retrieved successfully
 */
router.get("/", getProducts);

module.exports = router;