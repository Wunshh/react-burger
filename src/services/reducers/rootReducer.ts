import { combineReducers } from 'redux';
import { ingredient } from './reducers';
import { registrationFormReducer } from './registrationReducer';
import { loginFormReducer } from './loginReducer';
import { resetFormReducer } from './resetReduser';
import { forgotPasswordFormReducer } from './forgotPasswordReducer';
import { userDataReducer } from './userReduser';

export const rootReducer = combineReducers({
    ingredient,
    registrationFormReducer,
    loginFormReducer,
    resetFormReducer,
    forgotPasswordFormReducer,
    userDataReducer
});
