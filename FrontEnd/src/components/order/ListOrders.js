import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearErrors } from "../../actions/orderActions";

const ListOrders = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch state from the Redux store
    const { loading, error, orders } = useSelector(state => state.myOrders);

    useEffect(() => {
        dispatch(myOrders()); // Fetch user's orders when the component mounts

        if (error) {
            alert(error);
            dispatch(clearErrors()); // Clear errors after showing the alert
        }
    }, [dispatch, navigate, error]);

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'desc'
                },
                {
                    label: 'Num of Items',
                    field: 'numOfItems',
                    sort: 'desc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'desc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'desc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'desc'
                },
            ],
            rows: []
        };

        // Check if the orders array exists
        if (orders && Array.isArray(orders)) {
            orders.forEach((order) => {
                data.rows.push({
                    id: order._id,
                    numOfItems: order.orderItems.length,
                    amount: `PHP: ${order.totalPrice}`,
                    status: order.orderStatus && String(order.orderStatus).includes('Approved') ? (
                        <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    ) : (
                        <p style={{ color: 'red' }}>{order.orderStatus}</p>
                    ),
                    actions: (
                        <Fragment>
                            <Link to={`/order/${order._id}`} className="btn btn-success w-100">
                                <i className="fa fa-eye"></i> View
                            </Link>
                        </Fragment>
                    ),
                });
            });
        }
        return data;
    };

    return (
        <Fragment>
            <MetaData title={'My Orders'} />

            <h1 className="mt-5">My Orders</h1>

            {loading ? <div>Loading...</div> : (
                <MDBDataTable
                    data={setOrders()} // Pass the data to the table
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            )}
        </Fragment>
    );
};

export default ListOrders;
