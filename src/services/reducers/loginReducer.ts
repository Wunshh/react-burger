import { TForm } from '../../utils/types';
import { 
    LOGIN_FORM_SET_VALUE,
    POST_LOGIN_FORM_SUBMIT,
    POST_LOGIN_FORM_SUCCESS,
    POST_LOGIN_FORM_FAILED,
    LOGOUT,
    TLoginAction
} from '../actions/login';

export type TLoginState = {
    form: TForm;
    loginSuccess: boolean;
    loginRequest: boolean;
    loginFailed: boolean;
};

const initialState: TLoginState = {
    form: {
        email: '',
        password: '',
    },
    loginSuccess: false,
    loginRequest: false,
    loginFailed: false
}

const loginFormReducer = (state = initialState, action: TLoginAction): TLoginState => {
    switch(action.type) {
        case LOGIN_FORM_SET_VALUE: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            }
        }
        case POST_LOGIN_FORM_SUBMIT: {
            return {
                ...state,
                loginRequest: true,
                loginFailed: false
            }
        }
        case POST_LOGIN_FORM_SUCCESS: {
            
            return {
                ...state,
                form: {
                    ...initialState.form
                },
                loginRequest: false,
                loginSuccess: true
            }
        }
        case POST_LOGIN_FORM_FAILED: {
            return {
                ...state,
                loginRequest: false,
                loginFailed: true
            }
        }
        case LOGOUT: {
            return {
                form: {
                    ...initialState.form
                },
                loginSuccess: false,
                loginRequest: false,
                loginFailed: false
            }
        }
        default: {
            return state;
        }
    }
}

export {
    loginFormReducer
}