import * as api from '../../utils/api';
import { AppDispatch, AppThunk } from '../../utils/types';

const REGISTER_FORM_SET_VALUE: 'REGISTER_FORM_SET_VALUE' = 'REGISTER_FORM_SET_VALUE';
const POST_REGISTER_FORM_SUBMIT: 'POST_REGISTER_FORM_SUBMIT' = 'POST_REGISTER_FORM_SUBMIT';
const POST_REGISTER_FORM_SUCCESS: 'POST_REGISTER_FORM_SUCCESS' = 'POST_REGISTER_FORM_SUCCESS';
const POST_REGISTER_FORM_FAILED: 'POST_REGISTER_FORM_FAILED' = 'POST_REGISTER_FORM_FAILED';

export interface IRegisterFormSetValueAction {
    readonly type: typeof REGISTER_FORM_SET_VALUE;
    field: string;
    value: string
}

export interface IPostRegisterFormSubmitAction {
    readonly type: typeof POST_REGISTER_FORM_SUBMIT
}

export interface IPostRegisterFormSuccessAction {
    readonly type: typeof POST_REGISTER_FORM_SUCCESS 
}

export interface IPostRegisterFormFaildAction {
    readonly type: typeof POST_REGISTER_FORM_FAILED
}

export type TRegistrationAction = 
| IRegisterFormSetValueAction
| IPostRegisterFormSubmitAction
| IPostRegisterFormSuccessAction
| IPostRegisterFormFaildAction

const setRegistrationFormValue = (field: string, value: string): IRegisterFormSetValueAction => ({
    type: REGISTER_FORM_SET_VALUE,
    field,
    value
});

const postRegisterFormSubmitAction = (): IPostRegisterFormSubmitAction => ({
    type: POST_REGISTER_FORM_SUBMIT
});

const postRegisterFormSuccessAction = (): IPostRegisterFormSuccessAction => ({
    type: POST_REGISTER_FORM_SUCCESS
});

function catchFetchError(): IPostRegisterFormFaildAction  {
    return {
        type: POST_REGISTER_FORM_FAILED
    };
}

const register: AppThunk = (email: string, name: string, password: string) => {
    return function(dispatch: AppDispatch) {
        dispatch(postRegisterFormSubmitAction());
        api.register(email, name, password) 
        .then((res) => {
            if (res) {
                dispatch(postRegisterFormSuccessAction()); 
            } else {
                dispatch(
                    catchFetchError()
                );
            }
        })
        .catch((err) => {
            dispatch(
                catchFetchError()
            );
            console.log(err);
        });
    }
}

export {
    REGISTER_FORM_SET_VALUE,
    POST_REGISTER_FORM_SUBMIT,
    POST_REGISTER_FORM_SUCCESS,
    POST_REGISTER_FORM_FAILED,
    setRegistrationFormValue,
    register
}