import {
    GET_CLIENTS,
    GET_SINGLE_CLIENT,
    ADD_CLIENT,
    DELETE_CLIENT,
    CLIENTS_LOADING,
    ADD_FORM_TO_CLIENT,
    CLIENT_ADD_FAIL
} from '../actions/types';

const initialState = {
    clients: [],
    loading: false
};

//Create various states relating to clients that other pages use
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_CLIENTS:
        case ADD_FORM_TO_CLIENT:
            return {
                ...state,
                clients: action.payload,
                loading: false
            };
        case GET_SINGLE_CLIENT:
            return {
                ...state,
                clients: [action.payload],
                loading: false
            };
        case ADD_CLIENT:
            return {
                ...state,
                clients: [action.payload, ...state.clients]
            };
        case DELETE_CLIENT:
            return {
                ...state,
                clients: state.clients.filter(
                    client => client.clientID !== action.payload
                )
            };
        case CLIENT_ADD_FAIL:
            return {
                ...state,
                loading: false
            };
        case CLIENTS_LOADING:
            return {
                ...state,

                loading: true
            };
        default:
            return state;
    }
}
