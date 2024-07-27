import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Button, AppBar, Toolbar, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import '../index.css';

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);


  return (
    <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SafeBites
            </Typography>
            <Button color="inherit" component={Link} to="/restaurants">
              Restaurants
            </Button>
            <Button color="inherit" component={Link} to="/recipes">
              Recipes
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome, {currentUser ? currentUser.username : 'Guest'}
          </Typography>
          <Typography variant="body1" paragraph>
            {/* Add more content here if needed */}
          </Typography>
        </Container>

    </div>
  );
};

export default Home;
