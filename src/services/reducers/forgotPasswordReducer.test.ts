import { AnyAction } from 'redux';
import { initialState } from './forgotPasswordReducer'; 
import { forgotPasswordFormReducer } from './forgotPasswordReducer';
import {
    FORGOT_FORM_SET_VALUE,
    POST_FORGOT_FORM_SUBMIT,
    POST_FORGOT_FORM_SUCCESS,
    POST_FORGOT_FORM_FAILED
} from '../actions/forgotPassword';


describe('Тест forgotPasswordFormReducer', () => {

    const field = 'email';
    const value = 'test@test.ru';
    const res = false;

    it('Вернуть initialState', () => {
        expect(forgotPasswordFormReducer(undefined, {} as AnyAction)).toEqual(initialState);
    });
    
    it('Проверить FORGOT_FORM_SET_VALUE', () => {
        expect(forgotPasswordFormReducer({
            ...initialState
        }, {
            type: FORGOT_FORM_SET_VALUE,
            field,
            value
        })).toEqual({
            ...initialState,
            form: {
                ...initialState.form,
                email: value
            }
        })
    });

    it('Проверить POST_FORGOT_FORM_SUBMIT', () => {
        expect(forgotPasswordFormReducer(initialState, {
           type:  POST_FORGOT_FORM_SUBMIT,
        })).toEqual({
            ...initialState,
            forgorRequest: true,
            forgotFailed: false,
        })
    });

    it('Проверить POST_FORGOT_FORM_SUCCESS', () => {
        expect(forgotPasswordFormReducer({
            ...initialState
        }, {
            type: POST_FORGOT_FORM_SUCCESS,
            res
        })).toEqual({
            ...initialState,
            form: {
                ...initialState.form
            },
            forgorRequest: false,
            forgotSuccess: res
        })
    });

    it('Проверить POST_FORGOT_FORM_FAILED', () => {
        expect(forgotPasswordFormReducer(initialState, {
            type: POST_FORGOT_FORM_FAILED
        })).toEqual({
            ...initialState,
            forgorRequest: false,
            forgotFailed: true
        })
    });
});

