import {
    USER_FORM_SET_VALUE,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_REQUEST,
    GET_USER_DATA_FAILED
} from '../actions/user';

const initialState = {
    form: {
        name: '',
        email: '',
        password: ''
    },
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
                }
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
            console.log(action.res);
            return {
                ...state,
                form: {
                    name: action.res.user.name,
                    email: action.res.user.email,
                    password: '000000000'
                },
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
        default: {
            return state;
        }
    }
}

export {
    userDataReducer
}