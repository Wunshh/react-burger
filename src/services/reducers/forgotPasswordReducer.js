import { 
    FORGOT_FORM_SET_VALUE,
    POST_FORGOT_FORM_SUBMIT,
    POST_FORGOT_FORM_SUCCESS,
    POST_FORGOT_FORM_FAILED
} from '../actions/forgotPassword';

const initialState = {
    form: {
        email: '',
    },
    forgotSuccess: false,
    forgorRequest: false,
    forgotFailed: false
}

const forgotPasswordFormReducer = (state = initialState, action) => {
    switch(action.type) {
        case FORGOT_FORM_SET_VALUE: {
            return {
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            }
        }
        case POST_FORGOT_FORM_SUBMIT: {
            return {
                ...state,
                forgorRequest: true,
                forgotFailed: false
            }
        }
        case POST_FORGOT_FORM_SUCCESS: {
            console.log(action.res);
            return {
                ...state,
                form: {
                    ...initialState.form
                },
                forgorRequest: false,
                forgotSuccess: action.res.success
            }
        }
        case POST_FORGOT_FORM_FAILED: {
            return {
                ...state,
                forgorRequest: false,
                forgotFailed: true
            }
        }
        default: {
            return state;
        }
    }
}

export {
    forgotPasswordFormReducer
}