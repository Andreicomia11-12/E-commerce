import React, { Fragment, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import MetaData from '../layouts/MetaData';
import Loader from '../layouts/loader';
import Sidebar from './Sidebar';

import { toast } from 'react-toastify'; // Modern toast notifications
import { useDispatch, useSelector } from 'react-redux';
import { allOrders, clearErrors } from '../../actions/orderActions';

const OrdersList = () => {
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector((state) => state.allOrders);

    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    const setOrders = useCallback(() => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'No of Items',
                    field: 'numofItems',
                    sort: 'asc',
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc',
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: [],
        };

        orders?.forEach((order) => {
            data.rows.push({
                id: order._id,
                numofItems: order.orderItems.length,
                amount: `$${order.totalPrice.toFixed(2)}`,
                status: order.orderStatus === 'Delivered' ? (
                    <span className="badge bg-success">{order.orderStatus}</span>
                ) : (
                    <span className="badge bg-danger">{order.orderStatus}</span>
                ),
                actions: (
                    <Link to={`/admin/order/${order._id}`} className="btn btn-primary btn-sm">
                        <i className="fa fa-eye"></i>
                    </Link>
                ),
            });
        });

        return data;
    }, [orders]);

    return (
        <Fragment>
            <MetaData title="All Orders" />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-4">All Orders</h1>
                        {loading ? (
                            <Loader />
                        ) : (
                            <MDBDataTable
                                data={setOrders()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default React.memo(OrdersList);
