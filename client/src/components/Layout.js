import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();


  const hideAppBarRoutes = ['/login', '/signup'];

  const shouldHideAppBar = hideAppBarRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldHideAppBar && (
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
      )}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
