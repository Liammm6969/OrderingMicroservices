import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Rating,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  LocalDining,
  DeliveryDining,
  SupportAgent,
  RestaurantMenu
} from '@mui/icons-material';
import LoginButton from '../components/LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton';
const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

const {user,isAuthenticated} = useAuth0();
  const features = [
    {
      icon: <LocalDining sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      title: 'Quality Food',
      description: 'Enjoy delicious meals from the best restaurants in your area.'
    },
    {
      icon: <DeliveryDining sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      title: 'Fast Delivery',
      description: 'Get your food delivered to your doorstep in minutes.'
    },
    {
      icon: <RestaurantMenu sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      title: 'Wide Selection',
      description: 'Choose from thousands of restaurants and cuisines.'
    },
    {
      icon: <SupportAgent sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      title: '24/7 Support',
      description: 'Our customer support team is always ready to help you.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      text: 'This service has made ordering food so convenient. The delivery is always on time and the food is still hot!'
    },
    {
      name: 'Michael Chen',
      rating: 4,
      text: 'Great variety of restaurants to choose from. I use this app at least twice a week!'
    },
    {
      name: 'Emily Davis',
      rating: 5,
      text: "The best food delivery service I've used. The customer support is excellent and responsive."
    }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>

        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            OrderEats
            </Typography>
            {!isMobile && (
            <Stack direction="row" spacing={2}>
              <Button color="inherit">Home</Button>
              <Button color="inherit">About</Button>
              <Button color="inherit">Restaurants</Button>
              <Button color="inherit">Contact</Button>
            </Stack>
            )}
            <Box sx={{ ml: 2 }}>
            <LoginButton />
            <LogoutButton />
            <Button 
              variant="contained" 
              color="primary"
            >
              Sign Up
            </Button>

            {isAuthenticated && (
            <Typography
            variant="p"
            color="primary"
            sx={{
        
            textAlign: 'center',
            fontWeight: 'bold',
            }}
          >
          {user.name}
          </Typography>
       
              

            ) }
            </Box>
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <Box
          sx={{
            position: 'relative',
            height: '400px',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h3"
            color="primary"
            sx={{
            position: 'absolute',
            zIndex: 2,
            textAlign: 'center',
            fontWeight: 'bold',
            }}
          >
            Welcome to OrderEats
          </Typography>
         
        </Box>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 12,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            color="primary"
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 2 }}
          >
            Food Delivery Made Simple
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Order food from your favorite restaurants with just a few clicks.
            Fast delivery, great service, and delicious meals await you.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained" size="large" color="primary">
              Explore Restaurants
            </Button>
            <Button variant="outlined" size="large">
              Learn More
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6, fontWeight: 'bold' }}>
            Why Choose Us
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  elevation={1} 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    textAlign: 'center',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6, fontWeight: 'bold' }}>
            What Our Customers Say
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                    <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', mb: 2 }}>
                      "{testimonial.text}"
                    </Typography>
                    <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold' }}>
                      {testimonial.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: theme.palette.primary.main, color: 'white', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Ready to Order Delicious Food?
          </Typography>
          <Typography variant="h6" paragraph sx={{ mb: 4 }}>
            Download our app or order online now to get started.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: theme.palette.primary.main,
              '&:hover': {
                bgcolor: '#f0f0f0',
              },
              px: 4
            }}
          >
            Order Now
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#1a1a1a', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                OrderEats
              </Typography>
              <Typography variant="body2">
                The best food delivery service to satisfy your cravings.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Quick Links
              </Typography>
              <Typography variant="body2" paragraph>About Us</Typography>
              <Typography variant="body2" paragraph>Partner Restaurants</Typography>
              <Typography variant="body2" paragraph>Careers</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Contact
              </Typography>
              <Typography variant="body2" paragraph>Email: support@ordereats.com</Typography>
              <Typography variant="body2" paragraph>Phone: (555) 123-4567</Typography>
            </Grid>
          </Grid>
          <Typography variant="body2" sx={{ mt: 4, textAlign: 'center' }}>
            © {new Date().getFullYear()} OrderEats. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;