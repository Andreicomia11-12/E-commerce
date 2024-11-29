import React, { Fragment } from 'react';
import { Route, Link} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { toast, Toaster } from 'sonner';

import '../../App.css'

const Header = () => {

    const dispatch = useDispatch();
    
    const { user, loading } 

  return (
    <Fragment>
        <div className="navbar navbar-fluid">
            <div className="brand">
                <a href="/" className="company">MENTE INC.</a>
            </div>  
            <div className="menu">
                <a href="/home" className='me-2'>Home</a>
                <a href="/about" className='me-2'>About</a>
                <a href="/shop" className='me-2'>Shop</a>
                <a href="/contact" className='me-2'>Contact</a>
            </div>

            <div className="image-div">
                {/* <Link to="/login"><img src="/images/User.svg" alt="User profile"/></Link> */}
                <Link to="/login" type="button" className="btn btn-outline-dark py-1">Login</Link>

                <span className="cart-span">
                    <a href="/cart"><img src="/images/Cart.svg" alt="Shopping cart"/></a>
                    <div className="cart-count">0</div>
                </span>
            </div>
        </div>
    </Fragment>
  )
}

// Fragments is just an empty tag that encases the component 
export default Header;
