import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../layouts/loader';
import MetaData from '../layouts/MetaData';

import { login, clearErrors } from '../../actions/userActions';

import '../css/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [hasErrorToast, setHasErrorToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

  // Get the redirect path if it's present in the URL
  const redirect = new URLSearchParams(window.location.search).get('redirect') || '/';

  useEffect(() => {
    if (isAuthenticated) {
      toast.success('Logged in successfully!', {
        duration: 3000,
        style: { zIndex: 9999 },
      });

      setTimeout(() => {
        navigate(redirect); // Use `navigate()` to redirect to the appropriate page
      }, 800); // Delay navigation slightly for a smooth experience
    }

    // Handle errors if any
    if (error && !hasErrorToast) {
      const errorMessage = error === 'Invalid email or password'
        ? 'Incorrect email or password. Please try again.'
        : error === 'User not found'
        ? 'Email not registered. Please sign up.'
        : `Error: ${error}`;

      toast.warning(errorMessage, {
        duration: 5000,
        style: { zIndex: 9999 },
      });

      dispatch(clearErrors());
      setHasErrorToast(true);
    }

    // Reset the toast flag if error is cleared
    if (error === null) {
      setHasErrorToast(false);
    }
  }, [dispatch, error, isAuthenticated, redirect, navigate, hasErrorToast]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      <Toaster position="top-center" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Login" />
          <div className="row justify-content-center align-items-center min-vh-100">
            <div className="col-12 col-md-8 col-lg-5">
              <form
                className="shadow-lg p-4 rounded loginForm"
                onSubmit={submitHandler}
              >
                <h1 className="mb-4 text-center">Login</h1>

                <div className="form-group mb-3">
                  <label htmlFor="email_field" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control form1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="password_field" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control form1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="d-flex justify-content-between mb-4">
                  <Link to="/password/forgot" className="text-decoration-none">
                    Forgot Password?
                  </Link>
                  <Link to="/register" className="text-decoration-none">
                    New User?
                  </Link>
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-primary btn-block w-100 py-2"
                >
                  LOGIN
                </button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
