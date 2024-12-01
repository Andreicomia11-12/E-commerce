import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import MetaData from "../layouts/MetaData";
import { createOrder, clearErrors } from "../../actions/orderActions";
import CheckoutSteps from "./CheckoutSteps";

const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, order, loading } = useSelector((state) => state.order || {});
    const { cartItems, shippingInfo } = useSelector((state) => state.cart);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (order) {
            toast.success("Order placed successfully!");
            
        }
    }, [dispatch, error, order, navigate]);

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo")) || {};

    const orderDetails = {
        orderItems: cartItems,
        shippingInfo,
        ...orderInfo, // Includes itemsPrice, shippingPrice, taxPrice, and totalPrice
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createOrder(orderDetails));
        navigate("/success");
    };

    return (
        <Fragment>
            <MetaData title="Payment" />
            <Toaster position="top-center" />

            <CheckoutSteps shipping confirmOrder payment />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Confirm Order</h1>

                        <div className="form-group">
                            <label htmlFor="card_num_field">Name on Card</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone Number</label>
                            <input
                                type="text"
                                id="phone_field"
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email Address</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                required
                            />
                        </div>

                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Place Order"}
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Payment;
