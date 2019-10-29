import axios from 'axios';
import {
    GET_CLIENTS,
    ADD_CLIENT,
    DELETE_CLIENT,
    CLIENTS_LOADING,
    GET_SINGLE_CLIENT,
    ADD_FORM_TO_CLIENT,
    CLIENT_ADD_FAIL
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// Get list of clients
export const getClients = () => dispatch => {
    dispatch(setClientsLoading());
    axios
        .get('/api/clients')
        .then(res =>
            dispatch({
                type: GET_CLIENTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// Get data for a single client
export const getSingleClient = id => (dispatch, getState) => {
    dispatch(setClientsLoading());
    axios
        .get(`/api/clients/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_SINGLE_CLIENT,
                payload: res.data[0]
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// Add a new client
export const addClient = client => (dispatch, getState) => {
    axios
        .post('/api/clients', client, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_CLIENT,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(
                returnErrors(
                    err.response.data,
                    err.response.status,
                    'CLIENT_ADD_FAIL'
                )
            );
            dispatch({
                type: CLIENT_ADD_FAIL
            });
        });
};

// Add a new form result to a client
export const addFormToClient = (id, form) => (dispatch, getState) => {
    axios
        .post(`/api/clients/${id}`, form, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_FORM_TO_CLIENT,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

// Delete a client from the system
export const deleteClient = id => (dispatch, getState) => {
    axios
        .delete(`/api/clients/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_CLIENT,
                payload: id
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const setClientsLoading = () => {
    return {
        type: CLIENTS_LOADING
    };
};
