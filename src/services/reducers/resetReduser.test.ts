import { AnyAction } from 'redux'; 
import { initialState } from './resetReduser';
import { resetFormReducer } from './resetReduser';
import { 
    RESET_FORM_SET_VALUE,
    POST_RESET_FORM_SUBMIT,
    POST_RESET_FORM_SUCCESS,
    POST_RESET_FORM_FAILED,
} from '../actions/reset';


describe('Тест resetFormReducer', () => {

    const field = 'email';
    const value = 'test@test.ru';

    it('Вернуть initialState', () => {
        expect(resetFormReducer(undefined, {} as AnyAction)).toEqual(initialState);
    });

    it('Проверить RESET_FORM_SET_VALUE', () => {
        expect(resetFormReducer({
            ...initialState
        }, {
            type: RESET_FORM_SET_VALUE,
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

    it('Проверить POST_RESET_FORM_SUBMIT', () => {
        expect(resetFormReducer(initialState, {
            type: POST_RESET_FORM_SUBMIT
        })).toEqual({
            ...initialState,
            resetRequest: true,
            resetFailed: false
        })
    });

    it('Проверить POST_RESET_FORM_SUCCESS', () => {
        expect(resetFormReducer({
            ...initialState
        }, {
            type: POST_RESET_FORM_SUCCESS
        })).toEqual({
            ...initialState,
            resetRequest: false,
        })
    });

    it('Проверить POST_RESET_FORM_FAILED', () => {
        expect(resetFormReducer(initialState, {
            type: POST_RESET_FORM_FAILED
        })).toEqual({
            ...initialState,
            resetRequest: false,
            resetFailed: true
        })
    });
});