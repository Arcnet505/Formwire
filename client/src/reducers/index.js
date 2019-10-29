import { combineReducers } from 'redux';
import formReducer from './formReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import clientReducer from './clientReducer';
import userReducer from './userReducer';

export default combineReducers({
    form: formReducer,
    error: errorReducer,
    auth: authReducer,
    client: clientReducer,
    user: userReducer
});
