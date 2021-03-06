import { TForm } from '../../utils/types';
import { 
    FORGOT_FORM_SET_VALUE,
    POST_FORGOT_FORM_SUBMIT,
    POST_FORGOT_FORM_SUCCESS,
    POST_FORGOT_FORM_FAILED,
    TForgotFormAction
} from '../actions/forgotPassword';

export type TForgotPasswordState = {
    form: TForm;
    forgotSuccess: boolean;
    forgorRequest: boolean;
    forgotFailed: boolean;
}

export const initialState: TForgotPasswordState = {
    form: {
        email: '',
    },
    forgotSuccess: false,
    forgorRequest: false,
    forgotFailed: false
}

const forgotPasswordFormReducer = (state = initialState, action: TForgotFormAction): TForgotPasswordState => {
    switch(action.type) {
        case FORGOT_FORM_SET_VALUE: {           
            return {
                ...state,
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
            
            return {
                ...state,
                form: {
                    ...initialState.form
                },
                forgorRequest: false,
                forgotSuccess: action.res
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