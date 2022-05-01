import { 
    LOGIN_FORM_SET_VALUE,
    POST_LOGIN_FORM_SUBMIT,
    POST_LOGIN_FORM_SUCCESS,
    POST_LOGIN_FORM_FAILED,
} from '../actions/login';

const initialState = {
    form: {
        email: '',
        password: '',
    },
    loginSuccess: false,
    loginRequest: false,
    loginFailed: false
}

const loginFormReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_FORM_SET_VALUE: {
            return {
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
                loginSuccess: action.res.success
            }
        }
        case POST_LOGIN_FORM_FAILED: {
            return {
                ...state,
                loginRequest: false,
                loginFailed: true
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