const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const ProductModel = require('../models/productModel');
const multer = require('multer');
const path = require('path');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product catalog operations
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/', controller.getAll);
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get('/:id', controller.getById);
/**
 * @swagger
 * /api/products:
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
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *              category:
 *                type: string
 *               stock:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created
 */
// Set up multer storage (store in /uploads, keep original name)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });
router.post('/', upload.single('image'), controller.create);
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
router.delete('/:id', controller.delete);
/**
 * @swagger
 * /api/products/{id}/stock:
 *   patch:
 *     summary: Update stock for a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stock
 *             properties:
 *               stock:
 *                 type: number
 *     responses:
 *       200:
 *         description: Stock updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.patch('/:id/stock', controller.updateStock);


router.post("/addmany", async (req, res) => {
    try {
        const products = req.body; // Expecting an array of product objects
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "Invalid product data" });
        }

        const createdProducts = await ProductModel.insertMany(products);
        res.status(201).json(createdProducts);
    } catch (error) {
        console.error("Error adding multiple products:", error);
        res.status(500).json({ message: "Failed to add products", error: error.message });
    }
});

module.exports = router;