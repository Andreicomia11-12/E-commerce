import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { logout } from '../../actions/userActions';

import '../../App.css';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.cart);

    const logouthandler = () => {
        dispatch(logout());
        toast.success('Logged out successfully');
    };

    const loginHandler = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <Fragment>
            <div className="navbar navbar-fluid fixed-top">
                <div className="brand">
                    <a href="/" className="company">MENTE INC.</a>
                </div>
                <div className="menu">
                    <a href="/" className="me-2">Home</a>
                    <a href="#about" className="me-2">About</a>
                    <a href="#products_heading" className="me-2">Shop</a>
                    <a href="https://www.facebook.com/p/Mente-Excepcional-Online-Distribution-100064192950806/" className="me-2">Contact</a>
                </div>

                <div className="image-div">
                    <Link to="/cart" style={{ textDecoration: 'none' }}>
                        <span className="cart-span">
                            <a href="/cart"><img src="/images/Cart.svg" alt="Shopping cart" /></a>
                            <div className="cart-count">{cartItems.length}</div>
                        </span>
                    </Link>

                    {user ? (
                        <Link>
                            <div className="dropdown">
                                <button className="dropdown1 btn btn-white dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user && user.name}
                                </button>
                                <ul className="dropdown-menu text-black">
                                    {user.role === 'admin' && ( // Only show Admin link if the user is an admin
                                        <li><Link className="dropdown-item fs-6" to="/dashboard">Admin</Link></li>
                                    )}
                                    <li><Link className="dropdown-item fs-6" to="/orders/me">Orders</Link></li>
                                    <li><Link className="dropdown-item fs-6" to="/me">Profile</Link></li>
                                    <li><Link className="dropdown-item fs-6" to="/" onClick={logouthandler}>Logout</Link></li>
                                </ul>
                            </div>
                        </Link>
                    ) : !loading && (
                        <button type="button" className="btn btn-outline-dark login-button py-1 me-5" onClick={loginHandler}>
                            Login
                        </button>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default Header;
