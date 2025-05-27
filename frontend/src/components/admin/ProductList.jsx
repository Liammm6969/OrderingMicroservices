import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import ProductForm from './ProductForm';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [stockDialog, setStockDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newStock, setNewStock] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError('Error fetching products: ' + error.message);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete product');
        }

        setSuccessMessage('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        setError('Error deleting product: ' + error.message);
      }
    }
  };

  const handleStockUpdate = async () => {
    try {
      const response = await fetch(`/api/products/${selectedProduct._id}/stock`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stock: parseInt(newStock) }),
      });

      if (!response.ok) {
        throw new Error('Failed to update stock');
      }

      setStockDialog(false);
      setSelectedProduct(null);
      setNewStock('');
      setSuccessMessage('Stock updated successfully');
      fetchProducts();
    } catch (error) {
      setError('Error updating stock: ' + error.message);
    }
  };

  const openStockDialog = (product) => {
    setSelectedProduct(product);
    setNewStock(product.stock.toString());
    setStockDialog(true);
  };

  const handleCloseError = () => {
    setError('');
  };

  const handleCloseSuccess = () => {
    setSuccessMessage('');
  };

  return (
    <div>
      {editProduct ? (
        <ProductForm
          product={editProduct}
          onCancel={() => setEditProduct(null)}
          onSuccess={() => {
            setEditProduct(null);
            setSuccessMessage('Product updated successfully');
            fetchProducts();
          }}
        />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => openStockDialog(product)}
                    >
                      {product.stock}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => setEditProduct(product)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(product._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={stockDialog} onClose={() => setStockDialog(false)}>
        <DialogTitle>Update Stock</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Stock Quantity"
            type="number"
            fullWidth
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStockDialog(false)}>Cancel</Button>
          <Button onClick={handleStockUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar 
        open={!!successMessage} 
        autoHideDuration={6000} 
        onClose={handleCloseSuccess}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ProductList; 