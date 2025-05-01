import React, { use, useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Tab,
    Tabs,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import {
    AccountCircle,
    Edit,
    Email,
    LocationOn,
    Phone,
    ShoppingBag,
    Settings,
    Favorite,
    History
} from '@mui/icons-material';
import Navbar from './Navbar';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
    const theme = useTheme();
    const { user, isLoading } = useAuth0();
    const [userData, setUserData] = useState({
        name: 'John Doe',
        email: 'test'
    });
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setUserData(user);

        } else if (!isLoading) {
            const cachedUser = localStorage.getItem('user');
            if (cachedUser) {
                setUserData(JSON.parse(cachedUser));

            }
        }
    }, [user, isLoading]);

    return (
        <>  <Navbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                    My Profile
                </Typography>

                <Grid container spacing={4}>
                    {/* Left sidebar with user info */}
                    <Grid item xs={12} md={4}>
                        <Card elevation={3}>
                            <CardContent sx={{ textAlign: 'center', py: 3 }}>
                                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                    <Avatar
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            mx: 'auto',
                                            boxShadow: theme.shadows[3],
                                            border: `4px solid ${theme.palette.background.paper}`
                                        }}
                                    >
                                        {userData.picture ? (
                                            <img
                                                src={userData.picture}
                                                alt="User Avatar"
                                                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                                            />
                                        ) : (
                                            <AccountCircle sx={{ fontSize: 120 }} />
                                        )}
                                    </Avatar>
                                    <IconButton
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0,
                                            bgcolor: theme.palette.background.paper,
                                            '&:hover': { bgcolor: theme.palette.grey[200] }
                                        }}
                                    >
                                        <Edit fontSize="small" />
                                    </IconButton>
                                </Box>

                                <Typography variant="h5" sx={{ mt: 2, fontWeight: 'medium' }}>
                                    {userData.name}
                                </Typography>

                                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                    Member since April 2025
                                </Typography>

                                <Divider sx={{ my: 2 }} />

                                <List sx={{ width: '100%' }}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Email color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={userData.email}
                                            secondary="Email"
                                        />
                                    </ListItem>


                                </List>
                            </CardContent>
                        </Card>
                    </Grid>


                </Grid>
            </Container>
        </>
    );
};

export default Profile;