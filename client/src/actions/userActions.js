import axios from 'axios';
import {
    GET_USERS,
    DELETE_USER,
    USERS_LOADING,
    ADD_USER,
    USER_ADD_FAIL,
    UPDATE_USER_FAIL,
    UPDATE_USER
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// Get a list of users
export const getUsers = () => dispatch => {
    dispatch(setUsersLoading());
    axios
        .get('/api/users')
        .then(res =>
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// Register User
export const addUser = ({ username, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ username, password });

    axios
        .post('/api/users', body, config)
        .then(res =>
            dispatch({
                type: ADD_USER,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(
                returnErrors(
                    err.response.data,
                    err.response.status,
                    'USER_ADD_FAIL'
                )
            );
            dispatch({
                type: USER_ADD_FAIL
            });
        });
};

// Delete a user from the system
export const deleteUser = id => (dispatch, getState) => {
    axios
        .delete(`/api/users/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_USER,
                payload: id
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// Update a user's information or access level
export const updateUser = (id, user) => (dispatch, getState) => {
    axios
        .post(`/api/users/${id}`, user, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: UPDATE_USER,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(
                returnErrors(
                    err.response.data,
                    err.response.status,
                    'UPDATE_USER_FAIL'
                )
            );
            dispatch({
                type: UPDATE_USER_FAIL
            });
        });
};

export const setUsersLoading = () => {
    return {
        type: USERS_LOADING
    };
};
