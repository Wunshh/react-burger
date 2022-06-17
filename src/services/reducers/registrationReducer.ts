import { TForm } from '../../utils/types';
import { 
    REGISTER_FORM_SET_VALUE,
    POST_REGISTER_FORM_SUBMIT,
    POST_REGISTER_FORM_SUCCESS,
    POST_REGISTER_FORM_FAILED,
    TRegistrationAction
} from '../actions/registration';

export type TRegistrationState = {
    form: TForm;
    registrationRequest: boolean;
    registrationFailed: boolean;
};

export const initialState: TRegistrationState = {
    form: {
        email: '',
        name: '',
        password: '',
        codeFromEmail: ''
    },
    registrationRequest: false,
    registrationFailed: false
}

const registrationFormReducer = (state = initialState, action: TRegistrationAction): TRegistrationState => {
    switch(action.type) {
        case REGISTER_FORM_SET_VALUE: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            }
        }
        case POST_REGISTER_FORM_SUBMIT: {
            return {
                ...state,
                registrationRequest: true,
                registrationFailed: false
            }
        }
        case POST_REGISTER_FORM_SUCCESS: {
            return {
                ...state,
                form: {
                    ...initialState.form
                },
                registrationRequest: false
            }
        }
        case POST_REGISTER_FORM_FAILED: {
            return {
                ...state,
                registrationRequest: false,
                registrationFailed: true
            }
        }
        default: {
            return state;
        }
    }
}

export {
    registrationFormReducer
}