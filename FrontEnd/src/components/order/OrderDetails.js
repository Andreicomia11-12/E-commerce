import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner"; // Using Sonner for notifications
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/loader";
import { getOrderDetails, clearErrors } from "../../actions/orderActions";

const OrderDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams(); // Get the order ID from the route params

    const { loading, error, order } = useSelector((state) => state.orderDetails || {});
    const { shippingInfo, orderItems, user, totalPrice, orderStatus } = order || {};

    useEffect(() => {
        if (id) {
            dispatch(getOrderDetails(id)); // Fetch order details
        }

        if (error) {
            toast.error(error); // Show error using Sonner
            dispatch(clearErrors());
        }
    }, [dispatch, error, id]);

    const shippingDetails =
        shippingInfo &&
        `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

    if (loading) return <Loader />;

    if (!order) {
        return (
            <div>
                <h2>Order not found</h2>
            </div>
        );
    }

    return (
        <>
            <MetaData title={"Order Details"} />

            <div className="row d-flex mt-5 justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-details">
                    <h1 className="my-5">Order # {order._id}</h1>

                    <h4 className="mb-4">Shipping Info</h4>
                    <p>
                        <b>Name:</b> {user?.name}
                    </p>
                    <p>
                        <b>Phone:</b> {shippingInfo?.phoneNo}
                    </p>
                    <p className="mb-4">
                        <b>Address:</b> {shippingDetails}
                    </p>
                    <p>
                        <b>Amount:</b> ${totalPrice}
                    </p>

                    <hr />

                    <h4 className="my-4">Order Status:</h4>
                    <p
                        className={
                            orderStatus?.includes("Delivered") ? "greenColor" : "redColor"
                        }
                    >
                        <b>{orderStatus}</b>
                    </p>

                    <h4 className="my-4">Order Items:</h4>
                    <hr />
                    <div className="cart-item my-1">
                    {orderItems?.map((item) => (
    <div key={item.product} className="row my-5">
        <div className="col-5 col-lg-5">
            <Link to={`/products/${item.product}`}>{item.name}</Link>
        </div>
        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
            <p>${item.price}</p>
        </div>
        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
            <p>{item.quantity} Piece(s)</p>
        </div>
    </div>
))}                    </div>
                    <hr />
                </div>
            </div>
        </>
    );
};

export default OrderDetails;
