import React, { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import MetaData from '../layouts/MetaData';
import Loader from '../layouts/loader';
import Sidebar from './Sidebar';

import { Toaster, toast } from 'sonner'; // Import toast and Toaster from sonner
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts, deleteProduct, clearErrors } from '../../actions/productActions';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductsList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Use optional chaining (?.) to prevent destructuring errors if the state is undefined
    const { loading, error, products } = useSelector((state) => state.products || {});
    const { error: deleteError, isDeleted } = useSelector((state) => state.product || {});

    useEffect(() => {
        dispatch(getAdminProducts());

        // Handle errors from products state
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        // Handle errors from product deletion state
        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors());
        }

        // Handle success message on product deletion
        if (isDeleted) {
            toast.success('Product deleted successfully');
            navigate('/admin/product'); // Use navigate for navigation
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
    }, [dispatch, error, deleteError, isDeleted, navigate]);

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc',
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: [],
        };

        products?.forEach((product) => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock,
                actions: (
                    <Fragment>
                        <button
                            className="btn btn-danger py-1 px-2 ml-2 w-100"
                            onClick={() => deleteProductHandler(product._id)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                ),
            });
        });

        return data;
    };

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    return (
        <Fragment>
            <Toaster position="top-center" /> {/* Add the Toaster component */}
            <MetaData title={'All Products'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Products</h1>

                        {loading ? (
                            <Loader />
                        ) : (
                            <MDBDataTable
                                data={setProducts()}
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

export default ProductsList;
