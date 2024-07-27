import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../redux/features/userSlice'; // Adjust the import path as needed

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hideAppBarRoutes = ['/login', '/signup'];

  const shouldHideAppBar = hideAppBarRoutes.includes(location.pathname);

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', { method: 'DELETE' });

      if (response.ok) {
        dispatch(clearUser());

        navigate('/login');
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Logout failed');
      }
    } catch (err) {
      console.error('Logout error:', err.message);
    }
  };

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
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      )}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
