import { 
    ALL_PRODUCTS_REQUEST, 
    ALL_PRODUCTS_SUCCESS, 
    ALL_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,    
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants';

export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
        case ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }

        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            }

        case ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }

        case ALL_PRODUCTS_FAIL:
        case ADMIN_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
};

export const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {

        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            }

        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}
// In productReducers.js
export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,// Set loading to true when request is made
            };

        case PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false, // Set loading to false when data is successfully fetched
                product: action.payload, // Set the fetched product data into state
            };

        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                loading: false, // Set loading to false on failure
                error: action.payload, // Save the error message in the state
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null, // Reset errors
            };

        default:
            return state;
    }
};


export const productReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case DELETE_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false
            }


        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}