import axios from 'axios';
import { GET_FORMS, ADD_FORM, DELETE_FORM, FORMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// Get a list of all forms
export const getForms = () => dispatch => {
    dispatch(setFormsLoading());
    axios
        .get('/api/forms')
        .then(res =>
            dispatch({
                type: GET_FORMS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// Add a new form
export const addForm = form => (dispatch, getState) => {
    axios
        .post('/api/forms', form, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_FORM,
                payload: res.data
            })
        )
        .catch(err => {
            if (err.response) {
                dispatch(returnErrors(err.response.data, err.response.status));
            } else if (err.request) {
                console.log(err.request);
            } else {
                console.log('Error', err.message);
            }
        });
    console.log('Saved Form');
};

// Delete a form from the system
export const deleteForm = id => (dispatch, getState) => {
    axios
        .delete(`/api/forms/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_FORM,
                payload: id
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const setFormsLoading = () => {
    return {
        type: FORMS_LOADING
    };
};
