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
