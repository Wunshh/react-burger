import { TForm } from '../../utils/types';
import { 
    RESET_FORM_SET_VALUE,
    POST_RESET_FORM_SUBMIT,
    POST_RESET_FORM_SUCCESS,
    POST_RESET_FORM_FAILED,
    TResetAction
} from '../actions/reset';

export type TResetState ={
    form: TForm;
    resetRequest: boolean;
    resetFailed: boolean;
};

export const initialState: TResetState = {
    form: {
        password: '',
        token: ''
    },
    resetRequest: false,
    resetFailed: false
}

const resetFormReducer = (state = initialState, action: TResetAction): TResetState => {
    switch(action.type) {
        case RESET_FORM_SET_VALUE: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            }
        }
        case POST_RESET_FORM_SUBMIT: {
            return {
                ...state,
                resetRequest: true,
                resetFailed: false
            }
        }
        case POST_RESET_FORM_SUCCESS: {
            return {
                ...state,
                form: {
                    ...initialState.form
                },
                resetRequest: false,
            }
        }
        case POST_RESET_FORM_FAILED: {
            return {
                ...state,
                resetRequest: false,
                resetFailed: true
            }
        }
        default: {
            return state;
        }
    }
}

export {
    resetFormReducer
}