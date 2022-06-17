import { AnyAction } from 'redux'; 
import { initialState } from './registrationReducer';
import { registrationFormReducer } from './registrationReducer';

import { 
    REGISTER_FORM_SET_VALUE,
    POST_REGISTER_FORM_SUBMIT,
    POST_REGISTER_FORM_SUCCESS,
    POST_REGISTER_FORM_FAILED,
} from '../actions/registration';


describe('Тест registrationFormReducer', () => {

    const field = 'email';
    const value = 'test@test.ru';

    it('Вернуть initialState', () => {
        expect(registrationFormReducer(undefined, {} as AnyAction)).toEqual(initialState);
    });

    it('Проверить REGISTER_FORM_SET_VALUE', () => {
        expect(registrationFormReducer({
            ...initialState
        }, {
            type: REGISTER_FORM_SET_VALUE,
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

    it('Проверить POST_REGISTER_FORM_SUBMIT', () => {
        expect(registrationFormReducer(initialState, {
            type: POST_REGISTER_FORM_SUBMIT
        })).toEqual({
            ...initialState,
            registrationRequest: true,
            registrationFailed: false
        })
    });

    it('Проверить POST_REGISTER_FORM_SUCCESS', () => {
        expect(registrationFormReducer({
            ...initialState
        }, {
            type: POST_REGISTER_FORM_SUCCESS
        })).toEqual({
            ...initialState,
            registrationRequest: false
        })
    });

    it('Проверить POST_REGISTER_FORM_FAILED', () => {
        expect(registrationFormReducer(initialState, {
            type: POST_REGISTER_FORM_FAILED
        })).toEqual({
            ...initialState,
            registrationRequest: false,
            registrationFailed: true
        })
    });
});