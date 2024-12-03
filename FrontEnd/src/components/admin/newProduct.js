import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MetaData from '../layouts/MetaData';
import Sidebar from './Sidebar';

import { useDispatch, useSelector } from 'react-redux';
import { newProduct, clearErrors } from '../../actions/productActions';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';

const NewProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);

    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home',
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.newProduct);

    useEffect(() => {
        if (error) {
            console.error(`Error: ${error}`); // Replace with a toast or modal notification if needed
            dispatch(clearErrors());
        }

        if (success) {
            console.log('Product created successfully'); // Replace with a toast or modal notification if needed
            navigate('/admin/products');
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, error, success, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (!category) {
            alert("Please select a category."); // Replace with toast or modal if needed
            return;
        }

        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);

        dispatch(newProduct(formData));
    };

    return (
        <Fragment>
            <MetaData title="New Product" />
            <div className="row mt-5">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <div className="wrapper my-5">
                        <form
                            className="shadow-lg p-4"
                            onSubmit={submitHandler}
                            encType="multipart/form-data"
                        >
                            <h1 className="mb-4">New Product</h1>

                            <div className="mb-3">
                                <label htmlFor="name_field" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="price_field" className="form-label">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    id="price_field"
                                    className="form-control"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description_field" className="form-label">
                                    Description
                                </label>
                                <textarea
                                    className="form-control"
                                    id="description_field"
                                    rows="8"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="category_field" className="form-label">
                                    Category <span className="text-danger">*</span>
                                </label>
                                <select
                                    className="form-select"
                                    id="category_field"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value="">Select a Category</option>
                                    {categories.map((categoryOption) => (
                                        <option key={categoryOption} value={categoryOption}>
                                            {categoryOption}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="stock_field" className="form-label">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    id="stock_field"
                                    className="form-control"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-lg w-100"
                                disabled={loading}
                            >
                                CREATE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default NewProduct;
