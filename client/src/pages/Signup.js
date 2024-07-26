import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setError, setStatus } from '../redux/features/userSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);
  const navigate = useNavigate(); // Hook for navigation

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      allergies: '',
      restrictions: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%*?&#]/, 'Password must contain at least one special character (@$!%*?&#)')
        .required('Password is required'),
      allergies: Yup.string(),
      restrictions: Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {
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

        // Clear form inputs and redirect to login page
        resetForm();
        navigate('/login'); // Redirect to login page
      } catch (err) {
        dispatch(setError(err.message));
        dispatch(setStatus('failed'));
      }
    },
  });

  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      <h1>Signup</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div>{formik.errors.username}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="allergies">Allergies</label>
          <input
            id="allergies"
            name="allergies"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.allergies}
          />
        </div>

        <div>
          <label htmlFor="restrictions">Restrictions</label>
          <input
            id="restrictions"
            name="restrictions"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.restrictions}
          />
        </div>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
