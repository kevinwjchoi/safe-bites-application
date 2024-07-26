import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setError, setStatus, clearUser } from '../redux/features/userSlice'
import LoginForm from '../components/LoginForm';

const Login = () => {
  const dispatch = useDispatch();
  const { currentUser, status, error } = useSelector((state) => state.user);

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
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {currentUser ? (
        <div>
          <h1>Welcome, {currentUser.username}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <LoginForm onSubmit={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default Login;
