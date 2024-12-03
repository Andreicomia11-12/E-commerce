import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MetaData from '../layouts/MetaData';
import Loader from '../layouts/loader';
import Sidebar from './Sidebar';

import { useDispatch, useSelector } from 'react-redux';

import { getAdminProducts } from '../../actions/productActions';
import { allOrders } from '../../actions/orderActions';
import { allUsers } from '../../actions/userActions';

const Dashboard = () => {
    const dispatch = useDispatch();

    const { products = [] } = useSelector((state) => state.products); // Default to an empty array
    const { users = [] } = useSelector((state) => state.allUsers); // Default to an empty array
    const { orders = [], totalAmount = 0, loading } = useSelector((state) => state.allOrders); // Defaults

    let outOfStock = 0;

    // Ensure products is defined before iterating
    if (products.length > 0) {
        products.forEach((product) => {
            if (product.stock === 0) {
                outOfStock += 1;
            }
        });
    }

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(allOrders());
        dispatch(allUsers());
    }, [dispatch]);

    return (
        <Fragment>
            <div className="dashboard cont">
                <div className="row">
                    <div className="col-12 col-md-2">
                        <Sidebar />
                    </div>

                    <div className="col-12 col-md-10">
                        <h1 className="my-4">Dashboard</h1>

                        {loading ? (
                            <Loader />
                        ) : (
                            <Fragment>
                                <MetaData title={'Admin Dashboard'} />

                                <div className="row pr-4">
                                    <div className="col-xl-12 col-sm-12 mb-3">
                                        <div className="card text-white bg-primary o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">
                                                    Total Amount<br /> <b>${totalAmount.toFixed(2)}</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row pr-4">
                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-success o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">
                                                    Products<br /> <b>{products.length}</b>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-danger o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">
                                                    Orders<br /> <b>{orders.length}</b>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-info o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">
                                                    Users<br /> <b>{users.length}</b>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-warning o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">
                                                    Out of Stock<br /> <b>{outOfStock}</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Dashboard;
