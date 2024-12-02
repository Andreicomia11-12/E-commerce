import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import Loader from '../layouts/loader';
import MetaData from '../layouts/MetaData';
import '../css/productDetails.css';
import { getProductDetails, clearErrors } from '../../actions/productActions';
import { toast, Toaster } from 'sonner';
import { addItemToCart } from '../../actions/cartActions';

function ProductDetails() {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const { id } = useParams(); // Extract `id` from URL params

    const { loading, error, product } = useSelector((state) => state.productDetail); // Access product details from Redux

    useEffect(() => {
        if (id) {
            dispatch(getProductDetails(id)); // Fetch product details using the `id`
        }

        if (error) {
            dispatch(clearErrors()); // Clear errors if present
        }
    }, [dispatch, error, id]);

    const addToCart = () => {
        dispatch(addItemToCart(id, quantity));
        toast.success("Product added to cart successfully!");
    };

    const increaseQty = () => {
        if (quantity >= product.stock) return;
        setQuantity((prevQty) => prevQty + 1);
    };

    const decreaseQty = () => {
        if (quantity <= 1) return;
        setQuantity((prevQty) => prevQty - 1);
    };

    return (
        <Fragment>
            <Toaster 
            position='top-center'
            />
            <MetaData title={`${product?.name || 'Product Details'}`} />
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className="row d-flex product0 justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid border border-dark" id="product_image">
                            <Carousel pause="hover">
                                {product?.images?.map((image) => (
                                    <Carousel.Item key={image.public_id}>
                                        <img
                                            className="image1 d-block w-100"
                                            src={image.url}
                                            alt={product.title}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            <h2>{product?.name}</h2>
                            <p id="product_id">ID: {product?._id}</p>

                            <hr />

                            <p id="product_price">₱ {product?.price}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-dark minus" onClick={decreaseQty}>
                                    -
                                </span>
                                <input
                                    type="number"
                                    className="text-center count d-inline mx-3"
                                    value={quantity}
                                    readOnly
                                />
                                <span className="btn btn-dark plus me-2" onClick={increaseQty}>
                                    +
                                </span>
                            </div>
                            <button
                                type="button"
                                id="cart_btn"
                                className="btn btn-outline-dark d-inline"
                                disabled={product?.stock === 0}
                                onClick={addToCart}
                            >
                                Add to Cart
                            </button>

                            <hr />

                            <p>
                                Status:{' '}
                                <span
                                    className={product?.stock > 0 ? 'blackColor' : 'redColor'}
                                    id="stock_status"
                                >
                                    {product?.stock > 0
                                        ? ` In Stock (${product.stock}) pcs.`
                                        : ' Out of stock'}
                                </span>
                            </p>

                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p className="description">{product?.description}</p>
                            <hr />
                            <p id="product_seller" className="mb-3">
                                Distributed by: <strong>Mente Exceptional Inc.</strong>
                            </p>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default ProductDetails;
