import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';

import MetaData from '../layouts/MetaData';
import { register, clearErrors } from '../../actions/userActions';
import '../css/login.css';

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        store: '',
    });

    const { name, email, password, store } = user;
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/user1.png');
    const [hasErrorToast, setHasErrorToast] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); // Redirect to homepage on successful login
        }

        if (error && !hasErrorToast) {
            // Display specific warnings for errors
            if (error === 'Invalid email or password') {
                toast.warning('Incorrect email or password. Please try again.', {
                    duration: 5000,
                    style: { zIndex: 9999 },
                });
            } else if (error === 'User not found') {
                toast.warning('Email not registered. Please sign up.', {
                    duration: 5000,
                    style: { zIndex: 9999 },
                });
            } else {
                toast.error(`Error: ${error}`, {
                    duration: 5000,
                    style: { zIndex: 9999 },
                });
            }

            dispatch(clearErrors());
            setHasErrorToast(true); // Prevent re-triggering of the toast
        }
    }, [dispatch, hasErrorToast, isAuthenticated, error, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('store', store);
        formData.set('avatar', avatar); // Ensure avatar is the actual file, not a Data URL

        dispatch(register(formData));
    };

    const onChange = (e) => {
        if (e.target.name === 'avatar') {
            const file = e.target.files[0];
            setAvatarPreview(URL.createObjectURL(file)); // Preview the avatar
            setAvatar(file); // Set the actual file object
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    return (
        <Fragment>
            <MetaData title={'Register'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType="multipart/form-data">
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={onChange}
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
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={onChange}
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
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="avatar_upload">Avatar</label>
                            <div className="d-flex align-items-center">
                                <div>
                                    <figure className="avatar mr-3 item-rtl">
                                        <img
                                            src={avatarPreview}
                                            className="rounded-circle"
                                            alt="Avatar Preview"
                                        />
                                    </figure>
                                </div>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        name="avatar"
                                        className="custom-file-input"
                                        id="customFile"
                                        accept="images/*"
                                        onChange={onChange}
                                    />
                                    <label className="custom-file-label" htmlFor="customFile">
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false} // Disable the button when loading
                        >
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Register;
