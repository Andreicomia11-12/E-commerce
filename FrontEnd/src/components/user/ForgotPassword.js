import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layouts/MetaData';
import { forgotPassword, clearErrors } from '../../actions/userActions';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Safeguard against undefined state
    const { error, message, success, loading } = useSelector(state => state.forgotPassword || {});

    useEffect(() => {
        
        // Check if there's an error and display toast
        if (error) {
            toast.error(error, {
                duration: 3000,
                style: { zIndex: 9999 },
            });
            dispatch(clearErrors());
        }

        if (message) {
            toast.success(message, {
                duration: 3000,
                style: { zIndex: 9999 },
            });
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    }, [dispatch, error, message, success, navigate]);


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email);

        dispatch(forgotPassword(formData)); // Dispatch forgotPassword action
    };

    const Homepage = () => {
        toast.success('Email SuccessfullySend');
        navigate('/');
    }
    return (
        <Fragment>
            <MetaData title={'Forgot Password'} />
            <Toaster />
            <div className="forgot-password-container">
    <form className="forgot-password-form" onSubmit={submitHandler}>
        <h1 className="mb-3">Forgot Password</h1>
        <div className="form-group">
            <label htmlFor="email_field">Enter Email</label>
            <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </div>

        <button
            id="forgot_password_button"
            type="submit"
            className="btn btn-outline-dark mt-2 py-2 w-100"
            disabled={loading}
            onClick={Homepage}
        >
            Send Email
        </button>
    </form>
</div>

        </Fragment>
    )
}

export default ForgotPassword;
