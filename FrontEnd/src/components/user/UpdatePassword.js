import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layouts/MetaData';
import { updatePassword, clearErrors } from '../../actions/userActions';


const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Safeguard against undefined state
    const { isUpdated, error, loading } = useSelector((state) => state.user || {});
    const [hasErrorToast, setHasErrorToast] = useState(false); // Track if error toast is shown

    useEffect(() => {
        if (isUpdated) {
            console.log('User Updated successfully');
            toast.success('Updated successfully!', {
                duration: 3000, // Optional: duration of success message
                style: { zIndex: 9999 },
            });
        
            // Delay navigation
            setTimeout(() => {
                navigate('/');
            }, 800);
        }

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
    }, [dispatch, error, isUpdated, navigate, hasErrorToast]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);
        dispatch(updatePassword(formData));
    };


    return (
        <Fragment>
             <Toaster 
            position='top-center'
            />
            <MetaData title={"Change Password"} />
            <Toaster position="top-center" />
            <div className="update-password-container">
    <form className="shadow-lg update-password-form" onSubmit={submitHandler}>
        <h1 className="mt-2 mb-5">Update Password</h1>
        <div className="form-group">
            <label htmlFor="old_password_field">Old Password</label>
            <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
            />
        </div>

        <div className="form-group">
            <label htmlFor="new_password_field">New Password</label>
            <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <button
            type="submit"
            className="btn btn-outline-dark update-btn w-100 mt-4 mb-3"
            disabled={loading}

        >
            {loading ? "Updating..." : "Update Password"}
        </button>
    </form>
</div>

           
        </Fragment>
    );
};

export default UpdatePassword;
