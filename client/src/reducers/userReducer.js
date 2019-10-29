import {
    GET_USERS,
    GET_SINGLE_USER,
    ADD_USER,
    DELETE_USER,
    USERS_LOADING,
    USER_ADD_FAIL,
    UPDATE_USER,
    UPDATE_USER_FAIL
} from '../actions/types';

const initialState = {
    users: [],
    loading: false
};

//Create various states relating to users that other pages use
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case GET_SINGLE_USER:
            return {
                ...state,
                users: [action.payload],
                loading: false
            };
        case ADD_USER:
            return {
                ...state,
                users: [action.payload, ...state.users],
                loading: false
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload)
            };
        case USER_ADD_FAIL:
        case UPDATE_USER:
        case UPDATE_USER_FAIL:
            return {
                ...state,
                loading: false
            };
        case USERS_LOADING:
            return {
                ...state,

                loading: true
            };
        default:
            return state;
    }
}
