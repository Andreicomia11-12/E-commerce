import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Use useNavigate hook from React Router v6
import { toast, Toaster } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layouts/MetaData';
import { resetPassword, clearErrors } from '../../actions/userActions';

const NewPassword = () => {  
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();  

    // Safeguard against undefined state
    const { error, success } = useSelector(state => state.forgotPassword || {});
    console.log('Redux success:', success); // Check if it's `true` or contains the success message
    

    useEffect(() => {
        if (error) {
            toast.error(error, {
                duration: 3000,
                style: { zIndex: 9999 },
            });
            dispatch(clearErrors());
        }
    
        if (success) {
            toast.success('Password reset successfully!', {
                duration: 3000,
                style: { zIndex: 9999 },
            });
    
            // Redirect after a delay
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    }, [dispatch, error, success, navigate]);
     

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);

        // Extracting token from the URL
        const token = window.location.pathname.split('/')[3];  
        console.log('Token from URL:', token);  // Debug token extraction
        console.log('Password:', password, 'Confirm Password:', confirmPassword);  // Debug password fields

        dispatch(resetPassword(token, formData));  
    };

    return (
        <Fragment>
            <MetaData title={"Reset to New Password"} />
            <Toaster/>
            <div className="new-password-container">
    <form className="new-password-form shadow-lg" onSubmit={submitHandler}>
        <h1 className="mb-3">New Password</h1>

        <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <div className="form-group">
            <label htmlFor="confirm_password_field">Confirm Password</label>
            <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
        </div>

        <button
            id="new_password_button"
            type="submit"
            className="btn btn-outline-dark w-100 mt-3">
            Set Password
        </button>
    </form>
</div>

        </Fragment>
    );
};

export default NewPassword;
