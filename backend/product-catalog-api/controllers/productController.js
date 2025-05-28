const productService = require('../services/productService');
const fs = require('fs');
const path = require('path');

exports.getAll = async (req, res) => {
  const products = await productService.getAllProducts();
  res.json(products);
};

exports.getById = async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not Found' });
  res.json(product);
};

exports.create = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }
    const newProduct = await productService.createProduct(data);

    // Copy image to frontend/src/pictures if uploaded
    if (req.file) {
      const backendImagePath = path.join(__dirname, '../uploads', req.file.filename); // fixed path
      const frontendPicturesPath = path.join(__dirname, '../../../frontend/src/pictures', req.file.filename);
      fs.copyFile(backendImagePath, frontendPicturesPath, (err) => {
        if (err) {
          console.error('Failed to copy image to frontend:', err);
        } else {
          console.log('Image copied to frontend src/pictures:', req.file.filename);
        }
      });
    }

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  const deleted = await productService.deleteProductById(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Not Found' });
  res.json(deleted);
};

exports.update = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }
    const updated = await productService.updateProduct(req.params.id, data);
    if (!updated) return res.status(404).json({ message: 'Not Found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateStock = async (req, res) => {
  const { stock } = req.body;
  const updated = await productService.updateStock(req.params.id, stock);
  if (!updated) return res.status(404).json({ message: 'Not Found' });
  res.json(updated);
};