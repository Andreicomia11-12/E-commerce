import React, { Fragment } from "react";
import { Link, useNavigate } from 'react-router-dom';
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigate function

  // Access auth and cart state from Redux store
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;
    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    dispatch(addItemToCart(id, newQty));
  };

  const checkoutHandler = () => {
    // Navigate to the /shipping route when checkout is clicked
    navigate('/shipping');
  };

  return (
    <Fragment>
      <MetaData title="Shopping Cart" />

      {/* Check if user is authenticated */}
      {isAuthenticated ? (
        // If authenticated, display cart items
        cartItems.length === 0 ? (
          <h2 className="mt-5">Your Cart is Empty</h2>
        ) : (
          <Fragment>
            <div className="cart-tainer">
            <div className="container my-4 ">
              <h2 className="mt-5">
                Your Cart: <b>{cartItems.length} items</b>
              </h2>

              <div className="row g-3 justify-content-between">
                <div className="col-12 col-lg-8">
                  {cartItems.map((item) => (
                    <Fragment key={item.product}>
                      <hr />
                      <div className="cart-item">
                        <div className="row align-items-center">
                          <div className="col-4 col-lg-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="imag1 img-fluid"
                            />
                          </div>

                          <div className="col-5 col-lg-3">
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </div>

                          <div className="col-4 col-lg-2 mt-2 mt-lg-0">
                            <p className="fw-bold">${item.price}</p>
                          </div>

                          <div className="col-4 col-lg-3 mt-2 mt-lg-0">
                            <div className="input-group">
                              <button
                                className="btn btn-outline-dark"
                                onClick={() => decreaseQty(item.product, item.quantity)}
                              >
                                -
                              </button>
                              <input
                                type="number"
                                className="form-control text-center"
                                value={item.quantity}
                                readOnly
                              />
                              <button
                                className="btn btn-outline-dark"
                                onClick={() => increaseQty(item.product, item.quantity, item.stock)}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="col-4 col-lg-1 mt-2 mt-lg-0">
                            <i
                              className="fa fa-trash btn btn-dark"
                              onClick={() => removeCartItemHandler(item.product)}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                  <hr />
                </div>

                <div className="col-12 col-lg-3 my-4">
                  <div id="order_summary" className="card p-3">
                    <h4 className="card-title">Order Summary</h4>
                    <hr />
                    <p>
                      Subtotal:{" "}
                      <span className="fw-bold">
                        {cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)} Units
                      </span>
                    </p>
                    <p>
                      Total:{" "}
                      <span className="fw-bold">
                        {cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                      </span>
                    </p>
                    <hr />
                    <button className="btn btn-primary w-100" onClick={checkoutHandler}>Check out</button>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </Fragment>
        )
      ) : (
        // If not authenticated, show a message
        <h2 className="mt-5">Please log in to view your cart</h2>
      )}
    </Fragment>
  );
};

export default Cart;
