import {
    USER_FORM_SET_VALUE,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_REQUEST,
    GET_USER_DATA_FAILED,
    UPDATE_USER_DATA_REQUEST,
    UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_FAILED,
    RESET_USER_DATA_FAILED,
    USER_LOGOUT
} from '../actions/user';

const initialState = {
    form: {
        name: '',
        email: '',
        password: ''
    },
    userIsLoggin: false,
    userDataRequest: false,
    userDataFailed: false
}

const userDataReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_FORM_SET_VALUE: {
            return {
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
                userDataRequest: true,
                userDataFailed: false
            }
        }
        case GET_USER_DATA_SUCCESS: {
            return {
                ...state,
                form: {
                    name: action.res.user.name,
                    email: action.res.user.email,
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
                userDataFailed: false
            }
        }
        case UPDATE_USER_DATA_SUCCESS: {
            return {
                ...state,
                form: {
                    name: action.res.user.name,
                    email: action.res.user.email,
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
                form: {
                    ...initialState.form
                },
                userDataRequest: false,
                userDataFailed: false,
                userIsLoggin: false
            }
        }
        case USER_LOGOUT: {
            return {
                form: {
                    ...initialState.form
                },
                userIsLoggin: false,
                userDataRequest: false,
                userDataFailed: false
            }
        }
        default: {
            return state;
        }
    }
}

export {
    userDataReducer
}