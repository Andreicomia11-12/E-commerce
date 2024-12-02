import React, { Fragment } from 'react';
import {Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { logout } from '../../actions/userActions'

import '../../App.css'

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading } = useSelector( state => state.auth )
    const { cartItems } = useSelector( state => state.cart)

    const logouthandler = () => {
        dispatch(logout());
        toast.success('Logged out successfully');
    }

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
                <a href="/" className='me-2'>Home</a>
                <a href="#about" className='me-2'>About</a>
                <a href="#products_heading" className='me-2'>Shop</a>
                <a href="https://www.facebook.com/p/Mente-Excepcional-Online-Distribution-100064192950806/" className='me-2'>Contact</a>
            </div>

                
            
            <div className="image-div">
                {/* <Link to="/login"><img src="/images/User.svg" alt="User profile"/></Link> */}

                <Link to="/cart" style={{ textDecoration: 'none' }}>
                <span className="cart-span">
                    <a href="/cart"><img src="/images/Cart.svg" alt="Shopping cart"/></a>
                    <div className="cart-count">{cartItems.length}</div>
                </span>
                </Link>

                {user ? (

                    // <div className="ml-4 dropdown d-inline">
                    //     <Link to="!#" className="btn dropdown-toggle text-dark"
                    //     type='button' id='dropDownMenuButton' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    //        <figure className="avatar avatar-nav" >
                    //         <img 
                    //             src="/images/User.svg" alt={user && user.name} 
                    //             className='round-circle'
                    //         />
                    //         </figure> 
                    //         <span>{user && user.name}</span>
                    //     </Link>
                    // </div>

                    <Link>
                    <div className="dropdown">
                    <button className="dropdown1 btn btn-white dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {user && user.name}
                    </button>
                    <ul className="dropdown-menu text-black">

                        <li><Link className="dropdown-item fs-6" to="/dashboard">Dashboard</Link></li>
                        <li><Link className="dropdown-item fs-6" to="/orders/me">Orders</Link></li>
                    <li><Link className="dropdown-item fs-6" to="/me">Profile</Link></li>
                    <li><Link className="dropdown-item fs-6" to="/" onClick={logouthandler}>Logout</Link></li>
                    </ul>
                    </div>
                    </Link>

                ) : !loading && <button type="button" className="btn btn-outline-dark login-button py-1 me-5" onClick={loginHandler}>Login</button> }   
                
            </div>
        </div>
    </Fragment>
  )
}

// Fragments is just an empty tag that encases the component 
export default Header;
