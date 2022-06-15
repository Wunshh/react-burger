import { AnyAction } from 'redux';
import { initialState } from './loginReducer';
import { loginFormReducer } from './loginReducer';
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
    USER_LOGOUT
} from '../actions/login';


describe('Тест forgotPasswordFormReducer', () => {

    const field = 'email';
    const value = 'test@test.ru';

    const user = { 
        name: "test",
        email: 'test@test.ru',
        password: '*********'
    }

    it('Вернуть initialState', () => {
        expect(loginFormReducer(undefined, {} as AnyAction)).toEqual(initialState);
    });

    it('Проверить LOGIN_FORM_SET_VALUE', () => {
        expect(loginFormReducer({
            ...initialState
        }, {
            type: LOGIN_FORM_SET_VALUE,
            field,
            value
        })).toEqual({
            ...initialState,
            form: {
                ...initialState.form,
                email: value,
            }
        })
    });

    it('Проверить POST_LOGIN_FORM_SUBMIT', () => {
        expect(loginFormReducer(initialState, {
            type: POST_LOGIN_FORM_SUBMIT,
        })).toEqual({
            ...initialState,
            loginRequest: true,
            loginFailed: false
        })
    });

    it('Проверить POST_LOGIN_FORM_SUCCESS', () => {
        expect(loginFormReducer({
            ...initialState
        }, {
            type: POST_LOGIN_FORM_SUCCESS,
            user
        })).toEqual({
            ...initialState,
            form: {
                email: user.email,
                name: user.name,
                password: user.password
            },
            loginRequest: false,
            loginSuccess: true
        })
    });

    it('Проверить POST_LOGIN_FORM_FAILED', () => {
        expect(loginFormReducer(initialState, {
            type: POST_LOGIN_FORM_FAILED
        })).toEqual({
            ...initialState,
            loginRequest: false,
            loginFailed: true
        })
    });

    it('Проверить USER_FORM_SET_VALUE', () => {
        expect(loginFormReducer({
            ...initialState
        }, {
            type: USER_FORM_SET_VALUE,
            field,
            value
        })).toEqual({
            ...initialState,
            form: {
                ...initialState.form,
                email: value,
            },
            userIsLoggin: true
        })
    });

    it('Проверить GET_USER_DATA_REQUEST', () => {
        expect(loginFormReducer(initialState, {
            type: GET_USER_DATA_REQUEST,
        })).toEqual({
            ...initialState,
            userDataRequest: true
        })
    });

    it('Проверить GET_USER_DATA_SUCCESS', () => {
        expect(loginFormReducer({
            ...initialState
        }, {
            type: GET_USER_DATA_SUCCESS,
            user
        })).toEqual({
            ...initialState,
            form: {
                email: user.email,
                name: user.name,
                password: user.password
            },
            userIsLoggin: true,
            userDataRequest: false
        })
    });

    it('Проверить GET_USER_DATA_FAILED', () => {
        expect(loginFormReducer(initialState, {
            type: GET_USER_DATA_FAILED
        })).toEqual({
            ...initialState,
            userDataRequest: false,
            userDataFailed: true
        })
    });

    it('Проверить UPDATE_USER_DATA_REQUEST', () => {
        expect(loginFormReducer(initialState, {
            type: UPDATE_USER_DATA_REQUEST,
        })).toEqual({
            ...initialState,
            userDataRequest: true,
            userDataFailed: false,
            userIsLoggin: false
        })
    });

    it('Проверить UPDATE_USER_DATA_SUCCESS', () => {
        expect(loginFormReducer({
            ...initialState
        }, {
            type: UPDATE_USER_DATA_SUCCESS,
            user
        })).toEqual({
            ...initialState,
            form: {
                email: user.email,
                name: user.name,
                password: user.password
            },
            userDataRequest: false,
            userIsLoggin: true
        })
    });

    it('Проверить UPDATE_USER_DATA_FAILED', () => {
        expect(loginFormReducer(initialState, {
            type: UPDATE_USER_DATA_FAILED
        })).toEqual({
            ...initialState,
            userDataRequest: false,
            userDataFailed: true,
            userIsLoggin: false
        })
    });

    it('Проверить RESET_USER_DATA_FAILED', () => {
        expect(loginFormReducer(initialState, {
            type: RESET_USER_DATA_FAILED
        })).toEqual({
            ...initialState,
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
        })
    });

    it('Проверить USER_LOGOUT', () => {
        expect(loginFormReducer(initialState, {
            type: USER_LOGOUT
        })).toEqual({
            ...initialState,
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
        })
    });
});