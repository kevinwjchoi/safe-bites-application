import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setError, setStatus } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/SignupForm'; 
import { Container, Typography, CircularProgress, Box } from '@mui/material';

const Signup = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSignup = async (values) => {
    dispatch(setStatus('loading'));

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Signup failed');
      }

      const userData = await response.json();
      dispatch(setUser(userData));
      dispatch(setStatus('succeeded'));

      // Redirect to login page
      navigate('/login');
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setStatus('failed'));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      {status === 'loading' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {status === 'failed' && (
        <Typography color="error" variant="body1" align="center">
          Error: {error}
        </Typography>
      )}
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Sign Up
      </Typography>
      <SignupForm onSubmit={handleSignup} />
    </Container>
  );
};

export default Signup;
