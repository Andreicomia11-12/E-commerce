import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Loader from '../layouts/loader';
import MetaData from '../layouts/MetaData';

const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

  return (
    <Fragment>
      {loading ? <Loader/> : (
        <Fragment>
            <MetaData title={"Profile"} />
            <br></br>
            <br></br> 
            <br></br> 
            <br></br> 
            <br></br> 
            <br></br> 
        <div className='mt-5'>
            <h2 className="mt-5 ml-5">My Profile</h2>
        <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
                <figure className='avatar avatar-profile'>
                    <img className="rounded-circle img-fluid ms-5" src='/images/user.svg' alt={user.name} />
                </figure>
                <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5 w-100">
                    Edit Profile
                </Link>
            </div>
     
            <div className="col-12 col-md-5 text-center">
                 <h4>Full Name:</h4>
                 <p>{user.name}</p>
     
                 <h4>Email Address:</h4>
                 <p>{user.email}</p>

                 <h4>Store:</h4>
                 <p>{user.store}</p>

                 <h4>Joined On:</h4>
                 <p>{String(user.createdAt).substring(0, 10)}</p>

                <Link to="/password/update" className="btn btn-primary btn-block mt-3 w-100">
                    Change Password
                </Link>
            </div>
        </div>
        </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Profile
