import { 
    REGISTER_FORM_SET_VALUE,
    POST_REGISTER_FORM_SUBMIT,
    POST_REGISTER_FORM_SUCCESS,
    POST_REGISTER_FORM_FAILED
} from '../actions/registration';

const initialState = {
    form: {
        email: '',
        name: '',
        password: '',
        codeFromEmail: ''
    },
    registrationRequest: false,
    registrationFailed: false
}

const registrationFormReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTER_FORM_SET_VALUE: {
            return {
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