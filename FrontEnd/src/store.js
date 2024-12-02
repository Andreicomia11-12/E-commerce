import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Correct import for `redux-thunk`
import { composeWithDevTools } from '@redux-devtools/extension';

import { productsReducer, productDetailsReducer } from './reducers/productReducers';
import { authReducer, userReducer, forgotPasswordReducer } from './reducers/userReducers';

import { cartReducer } from './reducers/cartReducers';

import { newOrderReducer, myOrdersReducer, orderDetailsReducer } from './reducers/orderReducers';
const reducer = combineReducers({
    products: productsReducer,
    productDetail: productDetailsReducer,
    auth: authReducer,  
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
