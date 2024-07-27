import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box } from '@mui/material';

const CustomTextField = ({ label, ...props }) => (
  <Field
    name={props.name}
    as={TextField}
    label={label}
    variant="outlined"
    margin="normal"
    fullWidth
    helperText={<ErrorMessage name={props.name} />}
    error={Boolean(props.touched && props.errors)}
    {...props}
  />
);

const LoginForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
      })}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, resetForm, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          <Box>
            <CustomTextField
              name="username"
              label="Username"
              type="text"
              helperText={<ErrorMessage name="username" />}
              error={Boolean(touched.username && errors.username)}
            />
            <CustomTextField
              name="password"
              label="Password"
              type="password"
              helperText={<ErrorMessage name="password" />}
              error={Boolean(touched.password && errors.password)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2, width: '100%' }}
            >
              Login
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
