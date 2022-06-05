import { combineReducers } from 'redux';
import { ingredient } from './reducers';
import { registrationFormReducer } from './registrationReducer';
import { loginFormReducer } from './loginReducer';
import { resetFormReducer } from './resetReduser';
import { forgotPasswordFormReducer } from './forgotPasswordReducer';
import { userDataReducer } from './userReduser';
import { wsReduser } from './wsReduser';

export const rootReducer = combineReducers({
    ingredient: ingredient,
    registrationFormReducer: registrationFormReducer,
    loginFormReducer: loginFormReducer,
    resetFormReducer: resetFormReducer,
    forgotPasswordFormReducer: forgotPasswordFormReducer,
    userDataReducer: userDataReducer,
    wsReduser: wsReduser
});
