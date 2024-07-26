import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username is too short')
    .max(25, 'Username is too long')
    .required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password is too short')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
    .required('Password is required'),
  allergies: Yup.string(),
  restrictions: Yup.string(),
});

const SignupForm = ({ onSubmit }) => (
  <div>
    <h1>Sign Up</h1>
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        allergies: '',
        restrictions: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <Field type="text" name="username" placeholder="Username" />
            <ErrorMessage name="username" component="div" />
          </div>
          <div>
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <div>
            <Field type="text" name="allergies" placeholder="Allergies (optional)" />
            <ErrorMessage name="allergies" component="div" />
          </div>
          <div>
            <Field type="text" name="restrictions" placeholder="Restrictions (optional)" />
            <ErrorMessage name="restrictions" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default SignupForm;
