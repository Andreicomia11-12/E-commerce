import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Correct import for `redux-thunk`
import { composeWithDevTools } from '@redux-devtools/extension';

import { productsReducer, productDetailsReducer, newProductReducer } from './reducers/productReducers';
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer } from './reducers/userReducers';

import { cartReducer } from './reducers/cartReducers';

import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer } from './reducers/orderReducers';
const reducer = combineReducers({
    products: productsReducer,
    productDetail: productDetailsReducer,
    newProduct: newProductReducer,
    auth: authReducer,  
    allUsers: allUsersReducer,
    allOrders: allOrdersReducer,
    userReducer: userReducer,
    forgotPasswordReducer: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
});


const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {},
    },
};


const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
