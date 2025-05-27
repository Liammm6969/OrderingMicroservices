import React, { useState } from 'react';
import ProductList from '../components/admin/ProductList';
import ProductForm from '../components/admin/ProductForm';
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} style={{ marginTop: '20px' }}>
      {value === index && children}
    </div>
  );
}

function AdminDashboard() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Product List" />
          <Tab label="Add New Product" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <ProductList />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <ProductForm />
      </TabPanel>
    </Container>
  );
}

export default AdminDashboard; 