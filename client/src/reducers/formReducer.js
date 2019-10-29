import {
    GET_FORMS,
    ADD_FORM,
    DELETE_FORM,
    FORMS_LOADING
} from '../actions/types';

const initialState = {
    forms: [],
    loading: false
};

//Create various states relating to forms that other pages use
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_FORMS:
            return {
                ...state,
                forms: action.payload,
                loading: false
            };
        case ADD_FORM:
            return {
                ...state,
                forms: [action.payload, ...state.forms]
            };
        case DELETE_FORM:
            return {
                ...state,
                forms: state.forms.filter(form => form._id !== action.payload)
            };
        case FORMS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}
