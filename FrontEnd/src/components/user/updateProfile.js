import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';

import MetaData from '../layouts/MetaData';
import { updateProfile, loadUser, clearErrors } from '../../actions/userActions';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';

const UpdateProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [store, setStore] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth || {});
    const { error, isUpdated, loading } = useSelector((state) => state.user || {});

    useEffect(() => {
        console.log('isUpdated:', isUpdated); // Debug
        console.log('Error:', error); // Debug
    
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setStore(user.store || '');
        }
    
        if (error) {
            toast.error(`Error: ${error}`);
            dispatch(clearErrors());
        }
    
        if (isUpdated) {
            toast.success('Profile updated successfully!');
            dispatch(loadUser());
            navigate('/me');
            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [dispatch, user, error, isUpdated, navigate]);
    

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('store', store);

        dispatch(updateProfile(formData)); // Dispatch update profile action
    };

    return (
        <Fragment>
            <MetaData title="Update Profile" />
            
            <Toaster position="top-center" />
            <div className="update-profile-container">
    <form
        className="shadow-lg p-5 update-profile-form"
        onSubmit={submitHandler}
        encType="multipart/form-data"
    >
        <h1 className="mt-2 mb-5">Update Profile</h1>

        <div className="form-group">
            <label htmlFor="name_field">Name</label>
            <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>

        <div className="form-group">
            <label htmlFor="email_field">Email</label>
            <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <div className="form-group">
            <label htmlFor="store_field">Store</label>
            <input
                type="text"
                id="store_field"
                className="form-control"
                name="store"
                value={store}
                onChange={(e) => setStore(e.target.value)}
            />
        </div>

        <button
            type="submit"
            className="btn w-100 btn-outline-dark update-btn mt-4 mb-3"
            disabled={loading}
        >
            {loading ? "Updating..." : "Update"}
        </button>
    </form>
</div>

            
        </Fragment>
    );
};

export default UpdateProfile;
