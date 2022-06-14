import { TForm } from '../../utils/types';
import { 
    LOGIN_FORM_SET_VALUE,
    POST_LOGIN_FORM_SUBMIT,
    POST_LOGIN_FORM_SUCCESS,
    POST_LOGIN_FORM_FAILED,
    USER_FORM_SET_VALUE,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_REQUEST,
    GET_USER_DATA_FAILED,
    UPDATE_USER_DATA_REQUEST,
    UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_FAILED,
    RESET_USER_DATA_FAILED,
    USER_LOGOUT,
    TLoginAction
} from '../actions/login';

export type TLoginState = {
    form: TForm;
    loginSuccess: boolean;
    loginRequest: boolean;
    loginFailed: boolean;
    userIsLoggin: boolean;
    userDataRequest: boolean;
    userDataFailed: boolean;
};

export const initialState: TLoginState = {
    form: {
        email: '',
        password: '',
        name: '',
    },
    loginSuccess: false,
    loginRequest: false,
    loginFailed: false,
    userIsLoggin: false,
    userDataRequest: false,
    userDataFailed: false,
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
                    name: action.user.name,
                    email: action.user.email,
                    password: '*********'
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
        case USER_FORM_SET_VALUE: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value
                },
                userIsLoggin: true
            }
        }
        case GET_USER_DATA_REQUEST: {
            return {
                ...state,
                userDataRequest: true
            }
        }
        case GET_USER_DATA_SUCCESS: {
            return {
                ...state,
                form: {
                    email: action.user.email,
                    name: action.user.name,
                    password: '*********'
                },
                userIsLoggin: true,
                userDataRequest: false
            }
        }
        case GET_USER_DATA_FAILED: {
            return {
                ...state,
                userDataRequest: false,
                userDataFailed: true
            }
        }
        case UPDATE_USER_DATA_REQUEST: {
            return {
                ...state,
                userDataRequest: true,
                userDataFailed: false,
                userIsLoggin: false
            }
        }
        case UPDATE_USER_DATA_SUCCESS: {
            return {
                ...state,
                form: {
                    email: action.user.email,
                    name: action.user.name,
                    password: '*********'
                },
                userDataRequest: false,
                userIsLoggin: true
            }
        }
        case UPDATE_USER_DATA_FAILED: {
            return {
                ...state,
                userDataRequest: false,
                userDataFailed: true,
                userIsLoggin: false
            }
        }
        case RESET_USER_DATA_FAILED: {
            return {
                ...state,
                form: {
                    email: '',
                    password: '',
                },
                userDataRequest: false,
                userDataFailed: false,
                userIsLoggin: false,
                loginSuccess: false,
                loginRequest: false,
                loginFailed: false
            }
        }
        case USER_LOGOUT: {
            return {
                ...state,
                form: {
                    email: '',
                    password: '',
                },
                userIsLoggin: false,
                userDataRequest: false,
                userDataFailed: false,
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