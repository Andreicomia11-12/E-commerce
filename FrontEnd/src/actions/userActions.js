import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILED,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    NEW_PASSWORD_FAILED,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    CLEAR_ERRORS,
} from '../constants/userConstants';

// Login action
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // Send login request
        const { data } = await axios.post('/api/v1/login', { email, password }, config);

        // Dispatch success action if login is successful
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user, // Data contains the logged-in user
        });
    } catch (error) {
        // Dispatch failed action with error message if login fails
        const errorMessage = error.response && error.response.data.message
            ? error.response.data.message
            : error.message; // Fallback to generic error message if none exists

        dispatch({
            type: LOGIN_FAILED,
            payload: errorMessage, // Capturing the error message
        });
    }
};

// Register action for a new user
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data', // Used if you're sending files with form data (e.g., images)
            },
        };

        // Send registration request with the user data
        const { data } = await axios.post('/api/v1/register', userData, config);

        // Dispatch success action if registration is successful
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user, // Data contains the registered user
        });
    } catch (error) {
        // Dispatch failed action with error message if registration fails
        const errorMessage = error.response && error.response.data.message
            ? error.response.data.message
            : error.message; // Fallback to generic error message if none exists

        dispatch({
            type: REGISTER_USER_FAILED,
            payload: errorMessage, // Capturing the error message
        });
    }
};


//load user
export const loadUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        // Send registration request with the user data
        const { data } = await axios.get('/api/v1/me');

        // Dispatch success action if registration is successful
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user, // Data contains the registered user
        });
    } catch (error) {
        // Dispatch failed action with error message if registration fails
        const errorMessage = error.response && error.response.data.message
            ? error.response.data.message
            : error.message; // Fallback to generic error message if none exists

        dispatch({
            type: LOAD_USER_FAILED,
            payload: errorMessage, // Capturing the error message
        });
    }
};


// Get all users
export const allUsers = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_USERS_REQUEST })

        const { data } = await axios.get('/api/v1/admin/users')

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

//Update profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        console.log("Dispatching UPDATE_PROFILE_REQUEST...");

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const { data } = await axios.patch('/api/v1/me/update', userData, config);
        console.log("Received data from API:", data);

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: {
                user: data.user,
                success: data.success,  // Pass the success flag if it's in the response
            }
        });
        console.log("Dispatched UPDATE_PROFILE_SUCCESS with user:", data.user);
    } catch (error) {
        const errorMessage =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: errorMessage,
        });
        console.log("Dispatched UPDATE_PROFILE_FAIL with error:", errorMessage);
    }
};


export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json', // Adjust based on the data type
            },
        };

        // Send request to update the user profile
        const { data } = await axios.patch('/api/v1/password/update', passwords, config);

        // Dispatch success action if the request is successful
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.user // Payload contains the updated user
        });
    } catch (error) {
        // Handle and dispatch the error
        const errorMessage = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: errorMessage, // Payload contains the error message
        });
    }
};

//forgot password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json', // Adjust based on the data type
            },
        };

        // Send request to update the user profile
        const { data } = await axios.post('/api/v1/password/forgot', email, config);

        // Dispatch success action if the request is successful
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message // Payload contains the updated user
        });
    } catch (error) {
        // Handle and dispatch the error
        const errorMessage = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        dispatch({
            type: FORGOT_PASSWORD_FAILED,
            payload: errorMessage, // Payload contains the error message
        });
    }
};

//Reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PASSWORD_REQUEST });

        const config = {
            headers: { 'Content-Type': 'application/json' },
        };

        // Send request
        const { data } = await axios.patch(`/api/v1/password/reset/${token}`, passwords, config);
        console.log('API Response:', data); // Debug API response

        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success || data.message, // Ensure payload is not undefined
        });
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Something went wrong';
        dispatch({
            type: NEW_PASSWORD_FAILED,
            payload: errorMessage,
        });
    }
};


//logout user
export const logout = (userData) => async (dispatch) => {
    try {
        // Send registration request with the user data
        await axios.get('/api/v1/logout');

        // Dispatch success action if registration is successful
        dispatch({
            type: LOGOUT_SUCCESS,
        });
    } catch (error) {
        // Dispatch failed action with error message if registration fails
        const errorMessage = error.response && error.response.data.message
            ? error.response.data.message
            : error.message; // Fallback to generic error message if none exists

        dispatch({
            type: LOGOUT_FAILED,
            payload: errorMessage, // Capturing the error message
        });
    }
};



// Clear errors action
export const clearErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
