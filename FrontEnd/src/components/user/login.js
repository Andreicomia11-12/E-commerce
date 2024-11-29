import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster, ToastContainer } from 'sonner';
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

    useEffect(() => {
        // Redirect to homepage if authenticated
        if (isAuthenticated) {
            console.log('User logged in successfully');
            toast.success('Logged in successfully!', {
                duration: 3000, // Optional: duration of success message
                style: { zIndex: 9999 },
            });
        
            // Delay navigation
            setTimeout(() => {
                navigate('/');
            }, 800);
        }
        
        
        // Check if there's an error and no toast has been triggered yet
        if (error && !hasErrorToast) {
            // Display specific warnings for errors
            if (error === 'Invalid email or password') {
                toast.warning('Incorrect email or password. Please try again.', {
                    duration: 5000, // Display for 5 seconds
                    style: { zIndex: 9999 },
                });
            } else if (error === 'User not found') {
                toast.warning('Email not registered. Please sign up.', {
                    duration: 5000, // Display for 5 seconds
                    style: { zIndex: 9999 },
                });
            } else {
                toast.error(`Error: ${error}`, {
                    duration: 5000, // Display for 5 seconds
                    style: { zIndex: 9999 },
                });
            }
        
            // Clear errors after showing the toast
            dispatch(clearErrors());
        
            // Set flag to prevent re-triggering of the toast
            setHasErrorToast(true);
        }
        
    
        // Reset hasErrorToast when error changes
        if (error === null) {
            setHasErrorToast(false); // Reset flag to allow future error to trigger toast
        }
    }, [dispatch, hasErrorToast, isAuthenticated, error, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <Fragment>
            <Toaster 
            position='top-center'
            />
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
