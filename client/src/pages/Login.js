import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setError, setStatus, clearUser } from '../redux/features/userSlice'
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Box, CircularProgress, Alert, Button } from '@mui/material';


const Login = () => {
  const dispatch = useDispatch();
  const { currentUser, status, error } = useSelector((state) => state.user);
  const navigate = useNavigate(); 

  const handleLogin = async (values, {resetForm}) => {
    dispatch(setStatus('loading'));

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Login failed');
      }

      const userData = await response.json();
      dispatch(setUser(userData));
      dispatch(setStatus('succeeded'));

      resetForm();
      navigate('/home');

    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setStatus('failed'));
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'DELETE',
      });

      if (response.ok) {
        dispatch(clearUser());
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Logout failed');
      }

    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h1" component="h1" gutterBottom>
          Login
        </Typography>

        {status === 'loading' && <CircularProgress sx={{ mt: 2 }} />}
        {status === 'failed' && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

        {currentUser ? (
          <Box textAlign="center">
            <Typography variant="h5" component="h2">
              Welcome, {currentUser.username}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleLogout} sx={{ mt: 2 }}>
              Logout
            </Button>
          </Box>
        ) : (
          <LoginForm onSubmit={handleLogin} />
        )}
      </Paper>
    </Container>
  );
};

export default Login;
